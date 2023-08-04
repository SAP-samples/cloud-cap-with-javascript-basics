import * as db from './database.js'

export default async function (wss) {
    wss.broadcast("Before Database Call")
    await Promise.all([
        db.callDB3(wss),
        db.callDB4(wss)
    ])
    wss.broadcast("After Database Call")
    wss.broadcast("---Everything's Really Done Now. Go Home!---")
}