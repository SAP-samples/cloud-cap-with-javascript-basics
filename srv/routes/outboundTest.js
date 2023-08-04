import http from 'http'

export function load(app) {
    /**
     * @swagger
     *
     * /rest/outboundTest/{search}/{index}:
     *   get:
     *     summary: Multiply Two Numbers
     *     tags:
     *       - outboundTest
     *     parameters:
     *       - name: search
     *         in: path
     *         description: Search String
     *         required: true
     *         schema:
     *           type: string  
     *       - name: index
     *         in: path
     *         description: Result Index 
     *         required: false
     *         schema:
     *           type: integer      
     *     responses:
     *       '200':
     *         description: Results
     */
    app.get('/rest/outboundTest/:search/:index?', async (req, res, next) => {

        let search = req.params.search
        let index = 0
        if (!isNaN(parseInt(req.params.index))) {
            index = parseInt(req.params.index)
        }
        try {
            http.get({
                path: `http://www.loc.gov/pictures/search/?fo=json&q=${search}&`,
                host: "www.loc.gov",
                port: "80",
                headers: {
                    host: "www.loc.gov"
                }
            },
                (response) => {
                    response.setEncoding("utf8")
                    let body = ''

                    response.on("data", (data) => {
                        body += data
                    })

                    response.on("end", () => {
                        let searchDet = JSON.parse(body)
                        let image = ""
                        if(searchDet.results[index] && searchDet.results[index].image){
                            image = searchDet.results[index].image.full
                        }
       
                        let outBody =
                            `${encodeURIComponent(index)} Result of ${encodeURIComponent(searchDet.search.hits)}</br>
                            <img src="${encodeURI(image)}">`
                        return res.type("text/html").status(200).send(outBody)
                    })

                    response.on("error", (e) => {
                        app.log.error(e)
                        let error = new cds.error(e)
                        return next(error)
                    })
                })
        } catch (e) {
            app.log.error(e)
            let error = new cds.error(e)
            return next(error)
        }
    })

    return app
}