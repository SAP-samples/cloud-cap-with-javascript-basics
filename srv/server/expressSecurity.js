import helmet from 'helmet'
//import basic_auth from '@sap/cds/lib/auth/basic-auth.js'
export default function (app) {
    app.log(`Add Helmet`)
    app.use(helmet())
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "*.hana.ondemand.com", "ui5.sap.com"],
            styleSrc: ["'self'", "*.hana.ondemand.com", "ui5.sap.com", "'unsafe-inline'"],
            scriptSrc: ["'self'", "*.hana.ondemand.com", "ui5.sap.com", "'unsafe-inline'", "'unsafe-eval'", "cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "*.hana.ondemand.com", "ui5.sap.com", "*.loc.gov", "data:"]
        }
    }))
    // Sets "Referrer-Policy: no-referrer".
    app.use(helmet.referrerPolicy({ policy: "no-referrer" }))

    //Add back in for mocked testing of user authentication and authorization
 /*    const admin = ['cds.Subscriber', 'admin']
    const builder = ['cds.ExtensionDeveloper', 'cds.UIFlexDeveloper']
    app.use(basic_auth(
        {
            kind: 'basic-auth',
            impl: 'node_modules\\@sap\\cds\\lib\\auth\\basic-auth.js',
            users: {
                alice: { tenant: 't1', roles: [...admin], "attr": {familyName: "Mock", givenName: "Alice"}},
                bob: { tenant: 't1', roles: [...builder] },
                carol: { tenant: 't1', roles: [...admin, ...builder] },
                dave: { tenant: 't1', roles: [...admin], features: [] },
                erin: { tenant: 't2', roles: [...admin, ...builder] },
                fred: { tenant: 't2', features: ['isbn'] },
                me: { tenant: 't1', features: ['*'] },
                yves: { roles: ['internal-user'] },
                '*': true
            },
            tenants: {
                t1: { features: ['isbn'], }, // tenant-specific features
                t2: { features: '*', },
            }
        }
    )) */
}