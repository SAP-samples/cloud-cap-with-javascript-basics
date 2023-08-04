import toc from '../utils/exampleTOC.js'
import util from 'util'
import fs from 'fs'

export function load(app) {
    const readFilePromisified = util.promisify(fs.readFile)

    //Hello Router
    app.get("/rest/await", (req, res) => {
        var output =
            `<H1>Async/Await - Better Promises</H1></br>
			<a href="./await">/await</a> - Await readFile</br>
			<a href="./awaitError">/awaitError</a> - await readFile and catch error</br> 
			<a href="./awaitDB1">/awaitDB1</a> - Simple HANA DB Select via Await</br>`			
            toc()
        return res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/await/await:
     *   get:
     *     summary: Await readFile
     *     tags:
     *       - await
     *     responses:
     *       '200':
     *         description: await info
     */
    app.get("/rest/await/await", async (req, res, next) => {
        try {
            const text = await readFilePromisified(global.__base + "async/file.txt")
            return res.type("text/html").status(200).send(text)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/await/awaitError:
     *   get:
     *     summary: Await readFile and catch error
     *     tags:
     *       - await
     *     responses:
     *       '200':
     *         description: await info
     */
    app.get("/rest/await/awaitError", async (req, res, next) => {
        try {
            const text = await readFilePromisified(global.__base + "async/missing.txt")
            return res.type("text/html").status(200).send(text)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/await/awaitDB1:
     *   get:
     *     summary: Simple Database Select Await
     *     tags:
     *       - await
     *     responses:
     *       '200':
     *         description: await info
     */
    app.get("/rest/await/awaitDB1", async (req, res, next) => {
        try {
            console.log(cds.env.requires.db.kind)
            let dbQuery = ""
            switch (cds.env.requires.db.kind) {
                case 'hana':
                    dbQuery = SELECT
                        .columns("SESSION_USER")
                        .from("DUMMY")
                    break
                case 'sqlite':
                    dbQuery = SELECT
                    .from("sqlite_master")
                    break
                default:
                    break
            }
            let results = await cds.run(dbQuery)
            let result = JSON.stringify({
                Objects: results
            })
            return res.type("application/json").status(200).send(result)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    return app
}