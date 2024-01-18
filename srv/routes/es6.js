/* eslint-disable no-inner-declarations */
import util from 'util'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
import * as path from 'path'

export function load(app) {


    //New Node.js 8.x Utility to Promisify for you if the target uses (err,value)
    const readFilePromisified = util.promisify(fs.readFile)


    //Hello Router
    app.get("/rest/es6", (req, res) => {
        let output =
            `<H1>ES6 Features</H1></br>
			<a href="./promises">/promises</a> - Manual Promisefy readFile</br>
			<a href="./promisesError">/promisesError</a> - Manual Promisefy readFile and catch error</br> 
			<a href="./constants">/constants</a> - Constants</br>
			<a href="./blockScoped">/blockScoped</a> - Block-Scoped Variables and Functions</br>	
			<a href="./parameterDefaults">/parameterDefaults</a> - Parameter Defaults</br>	
			<a href="./parameterMultiple">/parameterMultiple</a> - Handling unknown number of input parameters easily</br>		
			<a href="./unicode">/unicode</a> - Unicode Strings and Literals</br>
			<a href="./numFormat">/numFormat</a> - International Number Formatting</br>	
			<a href="./currFormat">/currFormat</a> - International Currency Formatting</br>
			<a href="./dateFormat">/dateFormat</a> - International Date/Time Formatting</br>`
        res.type("text/html").status(200).send(output)
    })

    /**
         * @swagger
         *
         * /rest/promises/promises:
         *   get:
         *     summary: Manual Promisify readFile
         *     tags:
         *       - promises
         *     responses:
         *       '200':
         *         description: Output
         */
    app.get("/rest/es6/promises", (req, res, next) => {
        readFilePromisified(path.join(__dirname, "../async/file.txt"))
            .then(text => {
                return res.type("text/html").status(200).send(text)
            })
            .catch(e => {
                app.log.error(e)
                let error = new cds.error(e)
                return next(error)
            })
    })

    /**
     * @swagger
     *
     * /rest/promises/promisesError:
     *   get:
     *     summary: Manual Promisify readFile and catch error
     *     tags:
     *       - promises
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/promisesError", (req, res, next) => {
        readFilePromisified(path.join(__dirname, "../async/missing.txt"))
            .then(text => {
                return res.type("text/html").status(200).send(text)
            })
            .catch(e => {
                app.log.error(e)
                let error = new cds.error(e)
                return next(error)
            })
    })

    /**
     * @swagger
     *
     * /rest/es6/constants:
     *   get:
     *     summary: ES6 Constants
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/constants", (req, res, next) => {
        const fixVal = 10
        let newVal = fixVal
        try {
            newVal++
            // eslint-disable-next-line no-const-assign
            fixVal++
        } catch (e) {

            app.log.error(e)
            let error = new cds.error(`Constant Value: ${fixVal.toString()}, Copied Value: ${newVal.toString()}, Error: ${e.toString()}`)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/es6/blockScoped:
     *   get:
     *     summary: Block Scoped
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/blockScoped", (req, res) => {
        let output
        function foo() {
            return 1
        }
        output = `Outer function result: ${foo()} `
        if (foo() === 1) {
            function foo() {
                return 2
            }
            output += `Inner function results: ${foo()}`
        }
        return res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/es6/parameterDefaults:
     *   get:
     *     summary: Parameter Defaults
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/parameterDefaults", (req, res) => {
        function math(a, b = 10, c = 12) {
            return a + b + c
        }
        return res.type("text/html").status(200).send(`With Defaults: ${math(5)}, With supplied values: ${math(5, 1, 1)}`)

    })

    /**
     * @swagger
     *
     * /rest/es6/parameterMultiple:
     *   get:
     *     summary: Multiple Parameter
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/parameterMultiple", (req, res) => {
        function getLength(a, b, ...p) {
            return a + b + p.length
        }
        return res.type("text/html").status(200).send(`2 plus 4 parameters: ${getLength(1, 1, "stuff", "More Stuff", 8, "last param")}`)

    })

    /**
     * @swagger
     *
     * /rest/es6/unicode:
     *   get:
     *     summary: Unicode Strings and Literals
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/unicode", (req, res) => {
        if ("𠮷".length === 2) {
            return res.type("text/html").status(200).send(`Output: ${"𠮷".toString()}, Code Points: ${"𠮷".codePointAt(0)}`)
        }
    })

    /**
     * @swagger
     *
     * /rest/es6/numFormat:
     *   get:
     *     summary: Number Format
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/numFormat", (req, res) => {
        let numEN = new Intl.NumberFormat("en-US")
        let numDE = new Intl.NumberFormat("de-DE")
        return res.type("text/html").status(200).send(`US: ${numEN.format(123456789.10)}, DE: ${numDE.format(123456789.10)}`)
    })

    /**
     * @swagger
     *
     * /rest/es6/currFormat:
     *   get:
     *     summary: Currency Formatting
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/currFormat", (req, res) => {
        let curUS = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
        let curDE = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
        return res.type("text/html").status(200).send(`US: ${curUS.format(123456789.10)}, DE: ${curDE.format(123456789.10)}`)
    })

    /**
     * @swagger
     *
     * /rest/es6/dateFormat:
     *   get:
     *     summary: Date/Time Formatting
     *     tags:
     *       - es6
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/es6/dateFormat", (req, res) => {
        let dateUS = new Intl.DateTimeFormat("en-US")
        let dateDE = new Intl.DateTimeFormat("de-DE")
        return res.type("text/html").status(200).send(`US: ${dateUS.format(new Date())}, DE: ${dateDE.format(new Date())}`)
    })

    return app
}