import zipClass from 'node-zip'
import toc from '../utils/exampleTOC.js'

export function load(app) {

    app.get("/rest/zip", (req, res) => {
        var output =
            `<H1>ZIP Examples</H1></br> 
			<a href="./example1">/example1</a> - Download data in ZIP format - folder and files</br>
			<a href="./zipBooks">/zipBooks</a> - Download Books in ZIP format</br>
            <a href="./zipBooks2">/zipBooks2</a> - Download Books in ZIP format with selection inner format</br>` +
            toc()
        res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/zip/example1:
     *   get:
     *     summary: Manually Assemble content into Zip
     *     tags:
     *       - zip 
     *     responses:
     *       '200':
     *         description: Zip File
     *         content:
     *           application/zip:
     *             schema:
     *               type: string
     *               format: binary
     *       '500':
     *         description: General DB Error 
     */
    app.get("/rest/zip/example1", (req, res) => {
        const zip = new zipClass()
        zip.file("folder1/demo1.txt", "This is the new ZIP Processing in Node.js")
        zip.file("demo2.txt", "This is also the new ZIP Processing in Node.js")
        let data = zip.generate({
            base64: false,
            compression: "DEFLATE"
        })
        res.header("Content-Disposition", "attachment; filename=ZipExample.zip")
        return res.type("application/zip").status(200).send(Buffer.from(data, "binary"))
    })

    /**
     * @swagger
     *
     * /rest/zip/zipBooks:
     *   get:
     *     summary: DB query results in Zip
     *     tags:
     *       - zip 
     *     responses:
     *       '200':
     *         description: Zip File
     *         content:
     *           application/zip:
     *             schema:
     *               type: string
     *               format: binary
     *       '500':
     *         description: General DB Error 
     */
    app.get("/rest/zip/zipBooks", async (req, res, next) => {
        try {
            let dbQuery = SELECT
                .from(cds.entities.Books)
                .columns("ID", "title", "stock", "price", "currency_code", "author.name as author")
                .limit(25)
            const results = await cds.run(dbQuery)
            let out = `ID\tTitle\tAuthor\tStock\tPrice\tCurrency\n`
            for (let item of results) {
                out +=
                    `${item.ID}\t${item.title}\t${item.author}\t${item.stock}\t${item.price}\t${item.currency_code}\n`
            }
            const zip = new zipClass()
            zip.file("books.txt", out)
            let data = zip.generate({
                base64: false,
                compression: "DEFLATE"
            })
            res.header("Content-Disposition", "attachment; filename=bookWorklist.zip")
            return res.type("application/zip").status(200).send(Buffer.from(data, "binary"))
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/zip/zipBooks2/{format}:
     *   get:
     *     summary: DB query results in Zip - Multiple Inner Formats
     *     tags:
     *       - zip
     *     parameters:
     *       - name: format
     *         in: path
     *         description: output format 
     *         required: false
     *         default: txt
     *         schema:
     *           type: string
     *           enum: [txt, json, xlsx, csv]  
     *     responses:
     *       '200':
     *         description: Zip File
     *         content:
     *           application/zip:
     *             schema:
     *               type: string
     *               format: binary
     *       '500':
     *         description: General DB Error 
     */
    app.get("/rest/zip/zipBooks2/:format?", async (req, res, next) => {
        try {
            let dbQuery = SELECT
                .from(cds.entities.Books)
                .columns("ID", "title", "stock", "price", "currency_code", "author.name as author")
                .limit(25)
            const results = await cds.run(dbQuery)
            let format = req.params.format
            if (typeof format === "undefined" || format === null) {
                format = 'txt'
            }

            let output
            switch (format) {
                case 'xlsx':
                    output = to_zip(await excel(results), format)
                    break
                case 'json':
                    output = to_zip(JSON.stringify(results, null, 2), format)
                    break
                case 'csv':                    
                    output = to_zip(await csv(results), format)                    
                    break
                case 'txt':
                    output = to_zip(await text(results), format)
                    break
                case 'default':
                    throw new Error('Unknown format')
            }
            res.header("Content-Disposition", "attachment; filename=bookWorklist.zip")
            return res.type("application/zip").status(200).send(Buffer.from(output, "binary"))
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    function to_zip(data, format) {
        const zip = new zipClass()
        zip.file(`books.${format}`, data)
        let dataOut = zip.generate({
            base64: false,
            compression: "DEFLATE"
        })
        return dataOut
    }

    async function excel(results) {
        const { default: excel } = await import('node-xlsx')
        let out = []
        //Column Headers
        let header = []
        for (const [key] of Object.entries(results[0])) {
            header.push(key)
        }
        out.push(header)

        for (let item of results) {
            let innerItem = []
            for (const [key] of Object.entries(item)) {
                innerItem.push(item[key])
            }
            out.push(innerItem)
        }
        // @ts-ignore
        let excelOutput = excel.build([{
            name: "Books",
            data: out
        }])
        return excelOutput
    }

    async function csv(results) {
        const {AsyncParser} = await import('@json2csv/node')
        const opts = { delimiter: ";", transforms: [removeNewlineCharacter] }
        const transformOpts = {}
        const asyncOpts = {}
        const parser = new AsyncParser(opts, transformOpts, asyncOpts)
        return await parser.parse(results).promise()
    }

    async function text(results){
        const  {default: Table} = await import('easy-table')
        return Table.print(results)
    }

    function removeNewlineCharacter(dataRow) {

        let newDataRow = {}
        Object.keys(dataRow).forEach((key) => {
          if (typeof dataRow[key] === "string") {
            newDataRow[key] = dataRow[key].replace(/[\n\r]+/g, ' ')
          } else {
            newDataRow[key] = dataRow[key];
          }
        })
        return newDataRow
      }

    return app
}