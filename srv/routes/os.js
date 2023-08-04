import os from 'os'
import toc from '../utils/exampleTOC.js'
import child_process from 'child_process'
global.child = null

export function load(app){

	//Hello Router
	app.get("/rest/os", (req, res) => {
		var output =
			`<H1>OS level Examples</H1></br> 
			<a href="./osInfo">/osInfo</a></br>		
			<a href="./whoami">/whoami</a></br>` +
			toc()
		res.type("text/html").status(200).send(output)
	})

	/**
	 * @swagger
	 *
	 * /rest/os/osInfo:
	 *   get:
	 *     summary: Simple call to the Operating System
	 *     tags:
	 *       - os
	 *     responses:
	 *       '200':
	 *         description: Output
	 */		
	app.get("/rest/os/osInfo", (req, res) => {
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
	 * /rest/os/whoami:
	 *   get:
	 *     summary: Return OS level User
	 *     tags:
	 *       - os
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