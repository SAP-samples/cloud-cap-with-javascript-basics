# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A CAP (SAP Cloud Application Programming Model) **teaching sample**. The bookshop CDS model in `db/schema.cds` plus `srv/cat-service.*` and `srv/admin-service.*` is just minimal scaffolding — the real content is the collection of self-contained JavaScript lessons under `srv/routes/`, `srv/oo/`, `srv/async/`, and `srv/utils/`, each surfaced as an Express route under `/rest/...` on top of the CAP server.

Node.js **>= 22** is required (`package.json` engines), the project is ESM (`"type": "module"`), and CAP 9 / `@sap/cds-dk` 9 is the toolchain.

## Common commands

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Run dev server (live reload, mocked auth, in-memory SQLite) | `npm run watch` (= `cds watch --profile development`) |
| Run via the project's custom bootstrap (`srv/server.js`) | `npm start` (= `cds-serve`) |
| Regenerate `@cds-models/` typings | `npm run types` |
| VS Code launch ("cds serve") | `cds serve --with-mocks --in-memory?` (see `.vscode/launch.json`) |

There is **no test runner configured** and no `lint` script — do not invent commands. ESLint config exists at `.eslintrc` (run `npx eslint <path>` ad-hoc if needed); CAP-specific linting is available via `npx cds lint`.

## Architecture — the parts that span files

### Custom CAP bootstrap (`srv/server.js`)

This file is the keystone — read it before changing anything server-wide. It does three things that aren't obvious from the folder layout:

1. **`cds.on('bootstrap')`** dynamically imports `srv/server/express.js`, which wires Helmet CSP (`expressSecurity.js`), `@cloudnative/health-connect` endpoints (`healthCheck.js` → `/live`, `/ready`, `/health`, `/healthcheck`), `overload-protection`, and `express-status-monitor` (`/status`) onto CAP's own Express app.
2. **Default export** (used when CAP calls into a custom server) globs every `srv/routes/**/*.js`, dynamically `import()`s it, and calls its exported `load(app, server)` function. **Adding a lesson means dropping a file in `srv/routes/`** that exports `load` — there is no central registry.
3. **`cds.on('serving')`** registers `service.$linkProviders` to inject extra links (GraphQL, Express Status, Health Check, Swagger UI) into CAP's default index page, and mounts a `/model/` endpoint that returns the reflected CSN.

### Lesson layout

- `srv/routes/*.js` — each file is one teaching topic; pattern is `export function load(app[, server]) { app.get('/rest/<topic>', ...) }`. Swagger picks up JSDoc `@swagger` blocks from these files (configured in `srv/server/swagger.js` via `apis: ['./srv/routes/*']`).
- `srv/oo/`, `srv/async/` — supporting modules imported by route files; `srv/async/` includes intentional sync vs async examples (`fileSync.js` / `fileAsync.js`, `database*.js`, `httpClient*.js`).
- `srv/utils/exampleTOC.js` — the canonical link list; new lessons should be added here so they show up in the in-app TOC.
- `srv/routes/chatServer.js` — uses the `server` argument from `load(app, server)` to attach a `ws` `WebSocketServer` to the HTTP upgrade event; the only route that needs the second parameter.

### CAP services and CDS model

- `db/schema.cds` — bookshop model (`Books`, `Authors`, `Genres`) under namespace `sap.capire.bookshop`, seeded from CSVs in `db/data/`.
- `srv/cat-service.{cds,js}` — `CatalogService` exposed as **both `odata-v4` and `graphql`** (`@protocol: ['odata-v4','graphql']`), with `submitOrder` action and `OrderedBook` event.
- `srv/admin-service.{cds,js}` — admin projection guarded by `@(requires:'admin')`; generates IDs in `before NEW Books.drafts`.
- OData V2 compatibility is enabled via `@cap-js-community/odata-v2-adapter` (`cds.cov2ap.plugin: true` in `package.json`).
- TypeScript-aware models are generated into `@cds-models/` and aliased as `#cds-models/*` via `package.json#imports` and `tsconfig.json#paths`.

### Fiori UI under `app/`

`app/services.cds` glues two Fiori Elements apps (`browse/`, `admin-books/`) plus `common.cds` annotations into the served model. `app/package.json` carries an `@sap/approuter` dev setup (`start-local` uses `@sap/html5-repo-mock`) — separate from the root project's lifecycle.

## Conventions and gotchas

- **ESM only.** Use `import` / `export`, not `require`. New files must follow the same style or Node will refuse to load them.
- **CDS query DSL.** Use `cds.ql` / `SELECT` / `UPDATE` / `INSERT` (already declared as ESLint globals in `.eslintrc`) — do **not** write raw SQL.
- **Auth is mocked locally** (`cds.requires.auth: 'mocked'` in `package.json`); `expressSecurity.js` contains a commented-out `basic_auth` block with named test users (alice/bob/...) — uncomment to test role-based scenarios.
- **Logging.** Use `cds.log('nodejs')` in route/server code (matches the `cds.log.levels.nodejs` config in `package.json`); `console.log` is allowed by ESLint but `cds.log` is the project idiom.
- **GraphQL** is mounted at `/graphql` via `@cap-js/graphql` (configured in `package.json#cds.protocols.graphql`). Index-page links to it come from the `$linkProviders` hook in `server.js`.
- **Swagger UI** for the custom Express routes is at `/apiJS/api-docs` (the CAP-generated OData OpenAPI is separate). New routes should include a `@swagger` JSDoc block to appear there.
- **Health/monitoring endpoints** are part of the public surface: `/live`, `/ready`, `/health`, `/healthcheck`, `/status`. Don't repurpose these paths.
