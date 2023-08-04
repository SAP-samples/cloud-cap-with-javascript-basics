import excel from 'node-xlsx'
import bodyParser from 'body-parser'

export function load (app) {
    app.get("/rest/excel", (req, res) => {
		var output =
			`<H1>Excel Examples</H1></br>
			<a href="/rest/excel/download">/download</a> - Download data in Excel XLSX format</br>`
		res.type("text/html").status(200).send(output)
	});

	/**
	 * @swagger
	 *
	 * /rest/excel/download:
	 *   get:
	 *     summary: Export PO Items in Excel
	 *     tags:
	 *       - excel 
	 *     responses:
	 *       '200':
	 *         description: Contents of PO Items in Excel
	 *         content:
	 *           application/vnd.ms-excel:
	 *             schema:
	 *               type: string
	 *               format: binary
	 *       '500':
	 *         description: General DB Error 
	 */
	app.get("/rest/excel/download", async (req, res) => {
		try {

            let dbQuery = SELECT
            .from(cds.entities.Books)
            .limit(10)			
            const results = await cds.run(dbQuery)
			let out = []
			for (let item of results) {
				out.push([item.ID, item.title, item.stock, item.price, item.currency_code])
			}
			var result = excel.build([{
				name: "Books",
				data: out
			}])
			res.header("Content-Disposition", "attachment; filename=Excel.xlsx")
			return res.type("application/vnd.ms-excel").status(200).send(result)
		} catch (e) {
			app.log.error(e)
			return res.type("text/plain").status(500).send(`${e}`)
		}
	})

	/**
	 * @swagger
	 *
	 * /rest/excel/upload:
	 *   post:
	 *     summary: Upload Excel File and parse 
	 *     tags:
	 *       - excel
	 *     requestBody:
	 *       description: Excel File
	 *       required: true
	 *       content:
	 *         application/octet-stream:
	 *           schema:
	 *             type: string
	 *             format: binary
	 *     responses:
	 *       '201':
	 *         description: All data uploaded successfully
	 *       '500':
	 *         description: General Error 
	 */
	
	let excelParser = bodyParser.raw({
		type: 'application/octet-stream'
	})
	app.post('/rest/excel/upload', excelParser, async (req, res) => {
		try {
			const workSheetsFromBuffer = excel.parse(req.body)
			app.log(workSheetsFromBuffer)
			return res.status(201).end(`All Data Imported: ${JSON.stringify(workSheetsFromBuffer)}`)
		} catch (err) {
			return res.type("text/plain").status(500).send(`ERROR: ${JSON.stringify(err)}`)
		}
	})

}