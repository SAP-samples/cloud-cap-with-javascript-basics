import textbundle from '@sap/textbundle'
import {getLocaleReq} from '../utils/locale.js'
import os from 'os'

export function load(app){
	/**
	 * @swagger
	 *
	 * /rest/textBundle:
	 *   get:
	 *     summary: Language Dependent Text Bundles
	 *     tags:
	 *       - textBundle
	 *     responses:
	 *       '200':
	 *         description: Text
	 */

	app.get("/rest/textBundle", (req, res) => {
        const TextBundle = textbundle.TextBundle
		var bundle = new TextBundle(global.__base + "_i18n/messages", getLocaleReq(req))
		res.writeHead(200, {
			"Content-Type": "text/plain; charset=utf-8"
		})
		var greeting = bundle.getText("greeting", [os.hostname(), os.type()])
		res.end(greeting, "utf-8")
	})
	return app
}