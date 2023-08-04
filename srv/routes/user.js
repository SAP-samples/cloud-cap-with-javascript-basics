import * as utils from "../utils/general.js"
import * as locale from "../utils/locale.js"

export function load (app) {
    /**
     * @swagger
     *
     * /rest/user:
     *   get:
     *     summary: User/Member Information
     *     tags:
     *       - User
     *     responses:
     *       '200':
     *         description: User Details
     */
    app.get('/rest/user', async (req, res) => {
    
        try {
            let body = JSON.stringify({
                "session": [{
                    "UserName": utils.getSafe(() => req.user.id, ''),
                    "familyName": utils.getSafe(() => req.user.attr.familyName, ''),
                    "givenName": utils.getSafe(() => req.user.attr.givenName, ''),
                    "emails": utils.getSafe(() => req.user.emails, ''),
                    "Language": locale.getLocaleReq(req)
                }]
            });
            return res.type("application/json").status(200).send(body)
        } catch (err) {
            app.log.error(err)
            return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`)
        }
    })
}