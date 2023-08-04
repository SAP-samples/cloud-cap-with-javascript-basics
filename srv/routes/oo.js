import { getLocaleReq } from '../utils/locale.js'
import ooTutorial1 from '../oo/ooTutorial1.js'
import ooTutorial2 from '../oo/ooTutorial2.js'
import ooTutorial3 from '../oo/ooTutorial3.js'
import ooTutorial4 from '../oo/ooTutorial4.js'

export function load (app) {

    //Hello Router
    app.get("/rest/oo/", (req, res) => {
        let output =
            `<H1>JavaScript Object Oriented</H1></br>
        <a href="./classes1">/classses1</a> - Classes</br>
        <a href="./classes1Error">/classses1Error</a> - Classes, catch errors</br>
        <a href="./classes2a">/classes2a</a> - Classes with Static Methods #1</br>
        <a href="./classes2b">/classes2b</a> - Classes with Static Methods #2</br>
        <a href="./classes3a">/classes3a</a> - Classes with Instance Methods #1</br>
        <a href="./classes3b">/classes3b</a> - Classes with Instance Methods #2</br>	
        <a href="./classes4a">/classes4a</a> - Classes with Inherited Methods #1</br>
        <a href="./classes4b">/classes4b</a> - Classes with Inherited Methods #2</br>`
        res.type("text/html").status(200).send(output)
    })

    /**
     * @swagger
     *
     * /rest/oo/classes1:
     *   get:
     *     summary: OO - First Method Call
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes1", (req, res) => {
        let class1 = new ooTutorial1("first example")
        return res.type("text/html").status(200).send(`Call First Method: ${class1.myFirstMethod(5)}`)
    })

    /**
     * @swagger
     *
     * /rest/oo/classes1Error:
     *   get:
     *     summary: OO - Call and catch errors
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes1Error", (req, res, next) => {
        let class1 = new ooTutorial1("first example")
        try {
            return class1.myFirstMethod(20)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/oo/classes2a:
     *   get:
     *     summary: OO - Call static method
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes2a", async (req, res, next) => {
        try {
            const results = await ooTutorial2.getBookDetails("Wuthering Heights")
            return res.type("text/html").status(200).send(
                `Call Static Method: ${JSON.stringify(results)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/oo/classes2b:
     *   get:
     *     summary: OO - Call Static Method #2
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes2b", async (req, res, next) => {
        try {
            const results = await ooTutorial2.calculateBookPrice("Wuthering Heights")
            let cur = new Intl.NumberFormat(getLocaleReq(req), { style: "currency", currency: results.currency })
            return res.type("text/html").status(200).send(
                `Call Static Method - Calc Price: ${cur.format(results.price)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/oo/classes3a:
     *   get:
     *     summary: OO - Call Instance Method
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes3a", async (req, res, next) => {
        try {
            let class3 = new ooTutorial3("Wuthering Heights")
            const results = await class3.getBookDetails()
            return res.type("text/html").status(200).send(
                `Call Instance Method: ${JSON.stringify(results)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    /**
     * @swagger
     *
     * /rest/oo/classes3b:
     *   get:
     *     summary: OO - Call Instance Method #2
     *     tags:
     *       - oo
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/oo/classes3b", async (req, res, next) => {
        try {
            let class3 = new ooTutorial3("Wuthering Heights")
            const results = await class3.calculateBookPrice()
            let cur = new Intl.NumberFormat(getLocaleReq(req), { style: "currency", currency: results.currency })
            return res.type("text/html").status(200).send(
                `Call Instance Method - Calc Price: ${cur.format(results.price)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

	/**
	 * @swagger
	 *
	 * /rest/oo/classes4a:
	 *   get:
	 *     summary: OO - Call Inherited Method
	 *     tags:
	 *       - oo
	 *     responses:
	 *       '200':
	 *         description: Output
	 */	
	app.get("/rest/oo/classes4a", async(req, res, next) => {
        try {
            let class4 = new ooTutorial4("Wuthering Heights")
            const results = await class4.getBookDetails()
            return res.type("text/html").status(200).send(
                `Call Inherited Method: ${JSON.stringify(results)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
	})

	/**
	 * @swagger
	 *
	 * /rest/oo/classes4b:
	 *   get:
	 *     summary: OO - Call Overridden Method
	 *     tags:
	 *       - oo
	 *     responses:
	 *       '200':
	 *         description: Output
	 */	
	app.get("/rest/oo/classes4b", async(req, res, next) => {
        try {
            let class4 = new ooTutorial4("Wuthering Heights")
            const results = await class4.calculateBookPrice()
            let cur = new Intl.NumberFormat(getLocaleReq(req), { style: "currency", currency: results.currency })
            return res.type("text/html").status(200).send(
                `Call Overridden Method - Calc Price: ${cur.format(results.price)}`)
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
	})

	return app    
}