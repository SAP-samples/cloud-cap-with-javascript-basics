import toc from '../utils/exampleTOC.js'
import * as locale from '../utils/locale.js'
import fs from 'fs'

export function load(app) {
    //Hello Router
    app.get("/rest/JavaScriptBasics", (req, res) => {
        let output =
            `<H1>JavaScript Basics</H1></br>
			<a href="./dates">/dates</a> - Date processing</br>
			<a href="./array">/array</a> - Array processing</br>
			<a href="./json">/json</a> - JSON JavaScript Object Notation processing</br>
			<a href="./objects">/objects</a> - JavaScript Objects</br>
			<a href="./strings">/strings</a> - String processing</br>
			<a href="./classes">/classes</a> - JavaScript Classes</br>			
			<a href="./promises">/promises</a> - Promises</br>
			<a href="./constants">/constants</a> - Constants</br>
			<a href="./blockScoped">/blockScoped</a> - Block-Scoped Variables and Functions</br>	
			<a href="./parameterDefaults">/parameterDefaults</a> - Parameter Defaults</br>	
			<a href="./parameterMultiple">/parameterMultiple</a> - Handling unknown number of input parameters easily</br>		
			<a href="./unicode">/unicode</a> - Unicode Strings and Literals</br>
			<a href="./numFormat">/numFormat</a> - International Number Formatting</br>	
			<a href="./currFormat">/currFormat</a> - International Currency Formatting</br>
			<a href="./dateFormat">/dateFormat</a> - International Date/Time Formatting</br>` +
            toc()
        res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/strings:
     *   get:
     *     summary: Strings
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/strings", (req, res) => {
        let body = ""
        let demo1 = "SAP Cloud Application Programming Model"
        body += `Basic String: ${demo1} </p>`
        body += `The first character in the string: ${demo1[0]} </p>`
        body += `The length of the string: ${demo1.length.toString()} </p>`
        //slice with a negative index
        body += `The last character in the string: ${demo1.slice(-1)} </p>`
        body += `Upper: ${demo1.toUpperCase()} </p>`
        body += `Lower: ${demo1.toLowerCase()} </p>`
        body += `Find Cloud: ${demo1.indexOf("Cloud").toString()} </p>`
        body += `Find Last occurrence of the letter A: ${demo1.lastIndexOf("a").toString()} </p>`
        body += `Replace SAP: ${demo1.replace("SAP", "Systems Applications and Products in Data Processing")} </p>`
        let es6 = "ES6!"
        body += `Template Literals in ${es6}` + "</p>"
        body += `Multi-line string </br>
		         second line </p>`
        res.type("text/html").status(200).send(body)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/dates:
     *   get:
     *     summary: Dates
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/dates", (req, res) => {
        let body = ""
        let now = new Date()
        let nextMonth = new Date()

        body += `Now: ${now} </p>`
        body += `Now UTC: ${now.toUTCString()} </p>`
        body += `Now Date String: ${now.toDateString()} </p>`
        body += `Now Locale Date String: ${now.toLocaleDateString()} </p>`
        body += `Now Locale Time String: ${now.toLocaleTimeString()} </p>`
        body += `Now Locale String: ${now.toLocaleString()} </p>`
        body += `Now ISO String: ${now.toISOString()} </p>`
        body += `Now JSON String: ${now.toJSON()} </p>`
        body += `Now Year: ${now.getFullYear()} </p>`
        body += `Now Month: ${now.getMonth()} </p>`
        body += `Now Day of Week: ${now.getDay()} </p>`
        body += `Now Day of Month: ${now.getDate()} </p>`
        body += `Now number of milliseconds since midnight Jan 1, 1970: ${now.getTime()} </p>`
        body += `Now Hours: ${now.getHours()} </p>`
        body += `Now Minutes: ${now.getMinutes()} </p>`
        body += `Now Seconds: ${now.getSeconds()} </p>`

        nextMonth.setDate(now.getDate() + 30)
        body += `30 days from now: ${nextMonth} </p>`

        nextMonth.setDate(now.getDate() + 30)
        body += "30 days from now: " + nextMonth + "</p>"

        let dateUS = new Intl.DateTimeFormat("en-US")
        let dateDE = new Intl.DateTimeFormat("de-DE")
        let dateUser = new Intl.DateTimeFormat(locale.getLocaleReq(req))
        body += `US: ${dateUS.format(new Date())}, DE: ${dateDE.format(new Date())}, User: ${dateUser.format(new Date())} </p>`

        res.type("text/html").status(200).send(body)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/array:
     *   get:
     *     summary: Array
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/array", (req, res) => {
        let colors = ["<font color=\"red\">Red</font>",
            "<font color=\"green\">Green</font>",
            "<font color=\"blue\">Blue</font>"
        ]
        let extColors = ["<font color=\"black\">Black</font>",
            "<font color=\"white\">White</font>",
            "<font color=\"orange\">Orange</font>",
            "<font color=\"purple\">Purple</font>"
        ]

        let body = ""

        //toString converts simple and complex types to a String Representation
        //This allows the output of all Array elements	
        body = `Complete Array: ${colors.toString()} </p>`

        //Elements can be accessed by index - the first element is zero	
        body += `First Element: ${colors[0]} </p>`

        //length tells you how many elements in an array	
        body += `Number of Elements: ${colors.length.toString()} </p>`

        //indexOf allows you to get the zero-based position of a particular value in an array    
        body += `Position of Blue: ${colors.indexOf("<font color=\"blue\">Blue</font>").toString()} </p>`

        //Common technique to loop through all elements in an array
        body += "Loop of Elements: ";
        for (let color of colors) {
            body += color + " "
        }
        body += "</p>"

        //Combine two arrays
        colors = colors.concat(extColors)
        body += `Combined Array: ${colors.toString()} </p>`

        //Reverse Sort the Array
        colors.reverse()
        body += `Reverse Sort: ${colors.toString()} </p>`

        //Sort Ascending 
        colors.sort()
        body += `Sort Ascending: ${colors.toString()} </p>`

        //Remove the last element
        colors.pop()
        body += "Remove the last element: " + colors.toString() + "</p>"

        //Remove the first element
        colors.shift()
        body += `Remove the first element: ${colors.toString()} </p>`

        //Copy specific positions - slice(start,end)
        var slicedColors = colors.slice(2, 4)
        body += `Slice out the 3rd and 4th element: ${slicedColors.toString()} </p>`

        //Add multiple elements at specific position - splice(insertion Index, number of elements, value1, ...)
        colors.splice(2, 2, "<font color=\"malachite\">Malachite</font>", "<font color=\"fallow\">Fallow</font>")
        body += `Add two values at position 3: ${colors.toString()} </p>`

        //Add an element to the beginning of the array - unshift
        colors.unshift("<font color=\"brown\">Brown</font>")
        body += `Add element to the beginning of the array: ${colors.toString()} </p>`

        res.type("text/html").status(200).send(body)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/json:
     *   get:
     *     summary: JSON
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/json", async (req, res, next) => {
        try {
            let dbQuery = SELECT
                .from(cds.entities.Books)
                .limit(10)
            let results = await cds.run(dbQuery)
            let localVal = locale.getLocaleReq(req)
            for (let result of results) {
                let curUser = new Intl.NumberFormat(localVal, { style: "currency", currency: result.currency_code })
                result.discountAmount = parseFloat(result.price - result.price * .10).toFixed(2)
                result.formattedPrice = curUser.format(result.price)
            }
            return res.type("application/json").status(200).send(JSON.stringify(results))
        } catch (err) {
            app.log.error(err)
            let error = new cds.error(err)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/objects:
     *   get:
     *     summary: Objects
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/objects", async (req, res, next) => {
        let body = ""

        body += "<b>Object Literals</b></p>"
        //Object Literal	
        let colors = {
            red: "#FF0000",
            green: "#00FF00",
            blue: "#0000FF",
            favoriteColor() {
                let now = new Date()
                if (now.getDay() === 1) { //If Monday
                    return this.blue
                } else {
                    return this.red
                }
            }
        }
        body += `<span style="color: ${colors.red}">Red</span></p>`
        body += `<span style="color: ${colors["blue"]}">Blue</span></p>`
        body += `<span style="color: ${colors.green}">Green</span></p>`
        body += `<span style="color: ${colors.favoriteColor()}">Favorite Color</span></p>`

        body += "<b>References</b></p>"
        //References 
        //regular data types are assigned by value	
        let value1 = "First Value"
        let value2 = value1
        value1 = "New Value"
        body += `Value 1: ${value1} </p>` // = First Value
        body += `Value 2: ${value2} </p>` // = New Value

        //objects are assigned by reference
        let value3 = {
            val: "First Value"
        }
        let value4 = value3
        value3.val = "New Value"
        body += `Value 3: ${value3.val} </p>` // = New Value
        body += `Value 4: ${value4.val} </p>` // = New Value 	

        body += "<b>Object Constructor</b></p>"
        //Object Constructor
        function book(title) {
            this.discount = function () {
                return (parseFloat(this.price - this.price * .10).toFixed(2))
            }
            let me = this
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                try {
                    let dbQuery = SELECT
                        .from(cds.entities.Books)
                        .where({ title: title })
                        .limit(1)
                    let results = await cds.run(dbQuery)
                    me.ID = results[0].ID
                    me.price = results[0].price
                    resolve(me)
                } catch (e) {
                    reject(e)
                }
            })
        }

        try {
            var bookData = await new book(`Wuthering Heights`)
            body += `Book: ${bookData.ID} Price: ${bookData.price} Discount Amount: ${bookData.discount()} </p>`
            bookData = await new book(`Catweazle`)
            body += `Book: ${bookData.ID} Price: ${bookData.price} Discount Amount: ${bookData.discount()} </p>`
            return res.type("text/html").status(200).send(body)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/classes:
     *   get:
     *     summary: Classes
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/classes", async (req, res, next) => {
        let body = ""
        body += "<b>True Classes</b></p>"
        //Class Literal	
        class color {

            constructor() {
                this.red = "#FF0000"
                this.green = "#00FF00"
                this.blue = "#0000FF"
            }

            favoriteColor() {
                let now = new Date()
                if (now.getDay() === 1) { //If Monday
                    return this.blue
                } else {
                    return this.red
                }
            }
        }
        let colors = new color()
        body += `<span style="color: ${colors.red}">Red</span></p>`
        body += `<span style="color: ${colors["blue"]}">Blue</span></p>`
        body += `<span style="color: ${colors.green}">Green</span></p>`
        body += `<span style="color: ${colors.favoriteColor()}">Favorite Color</span></p>`

        body += "<b>Class Constructor</b></p>"
        //Class Constructor
        class book {
            constructor(bookData) {
                this.ID = bookData.ID
                this.price = bookData.price
            }

            discount() {
                return (parseFloat(this.price - this.price * ".10").toFixed(2))
            }
        }

        class BookFactory {
            static async create(title) {
                async function load(title) {
                    let dbQuery = SELECT
                        .from(cds.entities.Books)
                        .where({ title: title })
                        .limit(1)
                    let results = await cds.run(dbQuery)
                    return results[0]
                }
                let bookData = await load(title)
                return new book(bookData)
            }
        }

        try {
            var bookOut = null
            bookOut = await BookFactory.create(`Wuthering Heights`)
            body += `Book: ${bookOut.ID} Gross Amount: ${bookOut.price} Discount Amount: ${bookOut.discount()} </p>`

            bookOut = await BookFactory.create(`Catweazle`)
            body += `Book: ${bookOut.ID} Gross Amount: ${bookOut.price} Discount Amount: ${bookOut.discount()} </p>`
            return res.type("text/html").status(200).send(body)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/promises:
     *   get:
     *     summary: Promises
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/promises", (req, res, next) => {
        function readFilePromisified(filename) {
            return new Promise(
                (resolve, reject) => {
                    fs.readFile(filename, "utf8", (error, data) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(data)
                        }
                    })
                }
            )
        }
        readFilePromisified(global.__base + "async/file.txt")
            .then(text => {
                return res.type("text/html").status(200).send(text)
            })
            .catch(error => {
                app.log.error(error)
                let e = new cds.error(error)
                return next(e)
            })
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/constants:
     *   get:
     *     summary: ES6 Constants
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/constants", function (req, res) {
        const fixVal = 10
        let newVal = fixVal
        try {
            newVal++
            // eslint-disable-next-line no-const-assign
            fixVal++
        } catch (e) {
            res.type("text/html").status(200).send(
                `Constant Value: ${fixVal.toString()}, Copied Value: ${newVal.toString()}, Error: ${e.toString()}`)
        }
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/blockScoped:
     *   get:
     *     summary: Block Scoped
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/blockScoped", function (req, res) {
        let output

        function foo() {
            return 1
        }
        output = `Outer function result: ${foo()} `
        if (foo() === 1) {
            function foo() {  // eslint-disable-line
                return 2
            }
            output += `Inner function results: ${foo()}`
        }
        res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/parameterDefaults:
     *   get:
     *     summary: Parameter Defaults
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/parameterDefaults", function (req, res) {
        function math(a, b = 10, c = 12) {
            return a + b + c
        }
        res.type("text/html").status(200).send(`With Defaults: ${math(5)}, With supplied values: ${math(5, 1, 1)}`)

    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/parameterMultiple:
     *   get:
     *     summary: Multiple Parameters
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/parameterMultiple", function (req, res) {
        function getLength(a, b, ...p) {
            return a + b + p.length
        }
        res.type("text/html").status(200).send(`2 plus 4 parameters: ${getLength(1, 1, "stuff", "More Stuff", 8, "last param")}`)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/unicode:
     *   get:
     *     summary: Unicode Strings and Literals
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/unicode", function (req, res) {
        if ("𠮷".length === 2) {
            res.type("text/html").status(200).send(`Output: ${"𠮷".toString()}, Code Points: ${"𠮷".codePointAt(0)}`)
        }
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/numFormat:
     *   get:
     *     summary: Number Format
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/numFormat", function (req, res) {
        let numEN = new Intl.NumberFormat("en-US")
        let numDE = new Intl.NumberFormat("de-DE")
        res.type("text/html").status(200).send(`US: ${numEN.format(123456789.10)}, DE: ${numDE.format(123456789.10)}`)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/currFormat:
     *   get:
     *     summary: Currency Formatting
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/currFormat", function (req, res) {
        let curUS = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
        let curDE = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
        res.type("text/html").status(200).send(`US: ${curUS.format(123456789.10)}, DE: ${curDE.format(123456789.10)}`)
    })

    /**
     * @swagger
     *
     * /rest/JavaScriptBasics/dateFormat:
     *   get:
     *     summary: Date/Time Formatting
     *     tags:
     *       - JavaScriptBasics
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/JavaScriptBasics/dateFormat", function (req, res) {
        let dateUS = new Intl.DateTimeFormat("en-US")
        let dateDE = new Intl.DateTimeFormat("de-DE")
        res.type("text/html").status(200).send(`US: ${dateUS.format(new Date())}, DE: ${dateDE.format(new Date())}`)
    })
    return app
}