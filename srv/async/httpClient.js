import http from 'http'
export default function (wss) {
    wss.broadcast("Before HTTP Call\n")
    try {
        http.get({
            path: "http://www.loc.gov/pictures/search/?fo=json&q=SAP&",
            host: "www.loc.gov",
            port: "80",
            headers: {
                host: "www.loc.gov"
            }
        },
            (response) => {
                response.setEncoding("utf8")
                response.on("data", (data) => {
                    wss.broadcast(data.substring(0, 100))
                })
                response.on("error", wss.broadcast)
            })
    } catch (err) {
        cds.log('nodejs').error(err)
        wss.broadcast(err.toString())
    }
    wss.broadcast("After HTTP Call\n")
}