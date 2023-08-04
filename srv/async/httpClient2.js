import request from 'then-request'

export default async function (wss) {
    wss.broadcast("Before HTTP Call\n")
    try {
        let data = await request('GET', `http://www.loc.gov/pictures/search/?fo=json&q=SAP&`)
        let jsonObj = JSON.parse(data.getBody())
        wss.broadcast(JSON.stringify(jsonObj).substring(0, 100))
    } catch (err) {
        cds.log('nodejs').error(err)
        wss.broadcast(err.toString())
    }
    wss.broadcast("After HTTP Call\n")
}