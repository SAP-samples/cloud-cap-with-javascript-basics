import toc from '../utils/exampleTOC.js'
import asyncLib from 'async'
import { getSafe } from '../utils/general.js'
import os from 'os'
import child_process from 'child_process'

export function load(app) {

    let dbQuery = ""
    switch (cds.env.requires.db.kind) {
        case 'hana':
            `SELECT TABLE_NAME FROM M_TABLES 
            WHERE SCHEMA_NAME = CURRENT_SCHEMA 
              AND RECORD_COUNT > 0 `

            dbQuery = SELECT
                .columns("TABLE_NAME")
                .from("M_TABLES")
                .where({RECORD_COUNT: {'>': 0}})
                .limit(50)
            break
        case 'sqlite':
            dbQuery = SELECT
                .columns("type", "name", "tbl_name")
                .from("sqlite_schema")
                .limit(50)
            break
        case 'pg':
            dbQuery = SELECT
                .columns("schemaname", "tablename")
                .from("pg_catalog.pg_tables")
                .limit(50)
            break
        default:
            break
    }

    app.get("/rest/ex2/toc", (req, res) => {
        let output =
            `<H1>Exercise #2</H1></br>
			<a href="../">/</a> - DB Client</br>
			<a href="../waterfall">/waterfall</a> - Simple Database Select Via Client Wrapper/Middelware - Async Waterfall</br>	
			<a href="../promises">/promises</a> - Simple Database Select Via Client Wrapper/Middelware - Promises</br>	
			<a href="../await">/await</a> - Simple Database Select Via Client Wrapper/Middelware - Await</br>	
			<a href="../queryParallel">/queryParallel</a> - Call 2 Database queries in Parallel</br>	
			<a href="../whoAmI">/whoAmI</a> - Current User Info</br>	
			<a href="../env">/env</a> - Environment Info</br>
			<a href="../cfApi">/cfApi</a> - Current Cloud Foundry API</br>	
			<a href="../space">/space</a> - Current Space</br>	
			<a href="../os">/os</a> - OS Info</br>	
			<a href="../osUser">/osUser</a> - OS User</br>` +
            toc()
        res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/ex2:
     *   get:
     *     summary: DB Example with Callbacks and the hana-client
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2", async (req, res, next) => {
        try {
            let results = await cds.run(dbQuery)
            return res.type("application/json").status(200).send(results)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/ex2/waterfall:
     *   get:
     *     summary: Simple Database Select Via Client Wrapper/Middelware - Async Waterfall
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2/waterfall", (req, res, next) => {
        asyncLib.waterfall([
            function execute(callback) {
                cds.run(dbQuery)
                    .then(results => {
                        callback(null, results)
                    }).catch(error => {
                        callback(error)
                    })
            },
            function response(results, callback) {
                let result = JSON.stringify({
                    Objects: results
                })
                res.type("application/json").status(200).send(result)
                return callback()
            }
        ], function (e) {
            if (e) {
                app.log.error(e)
                let error = new cds.error(e)
                return next(error)
            }
        })
    })

    /**
     * @swagger
     *
     * /rest/ex2/promises:
     *   get:
     *     summary: Simple Database Select Via Client Wrapper/Middelware - Promises
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2/promises", (req, res, next) => {

        cds.run(dbQuery)
            .then(results => {
                return res.type("application/json").status(200).send(results)
            }).catch(e => {
                app.log.error(e)
                let error = new cds.error(e)
                return next(error)
            })

    })

    /**
     * @swagger
     *
     * /rest/ex2/await:
     *   get:
     *     summary: Simple Database Select Via Client Wrapper/Middelware - Await
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2/await", async (req, res, next) => {
        try {
            let results = await cds.run(dbQuery)
            return res.type("application/json").status(200).send(results)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/ex2/queryParallel:
     *   get:
     *     summary: Call 2 Database Queries in Parallel
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2/queryParallel", async (req, res, next) => {
        try {
            let [results1, results2] = await Promise.all([
                cds.run(dbQuery),
                cds.run(dbQuery)
            ])
            let output = { "results1": results1, "results2": results2 }
            return res.type("application/json").status(200).send(output)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/ex2/whoAmI:
     *   get:
     *     summary: User Context Information
     *     tags:
     *       - exercises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/ex2/whoAmI", (req, res) => {
        function mapSecurityContext(context) {
            let output = {}
            if (context) {
                output.user = {}
                output.user.logonName = getSafe(context.getLogonName())
                output.user.givenName = getSafe(context.getGivenName())
                output.user.familyName = getSafe(context.getFamilyName())
                output.user.email = getSafe(context.getEmail())
                output.user.userName = getSafe(context.getUserName())
                output.grantType = getSafe(context.getGrantType())
                output.uniquePrincipalName = getSafe(context.getUniquePrincipalName())
                output.origin = getSafe(context.getOrigin())
                output.appToken = getSafe(context.getAppToken())
                output.hdbToken = getSafe(context.getHdbToken())
                output.isInForeignMode = getSafe(context.isInForeignMode())
                output.subdomain = getSafe(context.getSubdomain())
                output.clientId = getSafe(context.getClientId())
                output.subaccountId = getSafe(context.getSubaccountId())
                output.expirationDate = getSafe(context.getExpirationDate())
                output.cloneServiceInstanceId = getSafe(context.getCloneServiceInstanceId())
            }
            return output
        }
        let userContext = req.authInfo
        let result = JSON.stringify({
            userContext: mapSecurityContext(userContext)
        })
        res.type("application/json").status(200).send(result)
    })

	/**
	 * @swagger
	 *
	 * /rest/ex2/env:
	 *   get:
	 *     summary: Process Environment
	 *     tags:
	 *       - exercises
	 *     responses:
	 *       '200':
	 *         description: Output
	 */		
	app.get("/rest/ex2/env", (req, res) => {
		return res.type("application/json").status(200).send(JSON.stringify(process.env))
	})

	/**
	 * @swagger
	 *
	 * /rest/ex2/cfApi:
	 *   get:
	 *     summary: VCAP CF API Endpoint
	 *     tags:
	 *       - exercises
	 *     responses:
	 *       '200':
	 *         description: Output
	 */	    
	app.get("/rest/ex2/cfApi", (req, res) => {
		let VCAP = JSON.parse(process.env.VCAP_APPLICATION);
		return res.type("application/json").status(200).send(JSON.stringify(VCAP.cf_api))
	})

	/**
	 * @swagger
	 *
	 * /rest/ex2/space:
	 *   get:
	 *     summary: VCAP Space
	 *     tags:
	 *       - exercises
	 *     responses:
	 *       '200':
	 *         description: Output
	 */		
	app.get("/rest/ex2/space", (req, res) => {
		let VCAP = JSON.parse(process.env.VCAP_APPLICATION)
		return res.type("application/json").status(200).send(JSON.stringify(VCAP.space_name))
	})

	/**
	 * @swagger
	 *
	 * /rest/ex2/os:
	 *   get:
	 *     summary: Simple call to the Operating System
	 *     tags:
	 *       - exercises
	 *     responses:
	 *       '200':
	 *         description: Output
	 */		
	app.get("/rest/ex2/os", (req, res) => {
		let output = {}

		output.tmpdir = os.tmpdir()
		output.endianness = os.endianness()
		output.hostname = os.hostname()
		output.type = os.type()
		output.platform = os.platform()
		output.arch = os.arch()
		output.release = os.release()
		output.uptime = os.uptime()
		output.loadavg = os.loadavg()
		output.totalmem = os.totalmem()
		output.freemem = os.freemem()
		output.cpus = os.cpus()
		output.networkInterfaces = os.networkInterfaces()

		var result = JSON.stringify(output)
		res.type("application/json").status(200).send(result)
	})
	
	/**
	 * @swagger
	 *
	 * /rest/ex2/osUser:
	 *   get:
	 *     summary: Return OS level User
	 *     tags:
	 *       - exercises
	 *     responses:
	 *       '200':
	 *         description: Output
	 */		
	app.get("/rest/ex2/osUser", (req, res, next) => {
		var exec = child_process.exec
		exec("whoami", (e, stdout) => {
			if (e) {
                app.log.error(e)
                let error = new cds.error(e)
                return next(error)
			} else {
				res.type("text/plain").status(200).send(stdout)
			}
		})
	})
	
	return app    
}