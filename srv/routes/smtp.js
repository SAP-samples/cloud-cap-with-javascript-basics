import xsenv from '@sap/xsenv'

export function load(app) {
    /**
     * @swagger
     *
     * /rest/smtp:
     *   get:
     *     summary: SMTP example via nodemailer (requires external SMTP service setup)
     *     tags:
     *       - smtp
     *     responses:
     *       '200':
     *         description: Sent mail info
     */
    app.get("/rest/smtp", (req, res, next) => {
        let options = {}
        //Add SMTP
        try {
            options = Object.assign(options, xsenv.getServices({
                mail: {
                    "name": "dat260.smtp"
                }
            }))

            const nodemailer = require("nodemailer")
            // create reusable transporter object using the default SMTP transport
            app.logger.info(JSON.stringify(options.mail))
            let transporter = nodemailer.createTransport(options.mail)

            // setup email data with unicode symbols
            let mailOptions = {
                from: "\"DAT260\" <dat260@sap.teched.com", // sender address
                to: "Dummy <dummy@mail.com>", // list of receivers
                subject: "Mail Test from Pure Node.js using NodeMailer", // Subject line
                text: "The body of the mail from Pure Node.js using NodeMailer" // plain text body
                //        html: '<b>Hello world?</b>' // html body
            }

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return app.log.error(error)
                }
                console.log("Message sent: %s", info.messageId)
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
                let output = `Preview URL: <a href="${nodemailer.getTestMessageUrl(info)}">${nodemailer.getTestMessageUrl(info)}</a>`
                return res.type("text/html").status(200).send(output)
            })

        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    return app
}