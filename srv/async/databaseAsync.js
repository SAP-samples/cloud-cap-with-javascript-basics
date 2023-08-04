import * as db from './database.js'

export default function (wss) {
    wss.broadcast("Before Database Call")
    db.callDB1(wss)
    db.callDB2(wss)
    wss.broadcast("After Database Call")
}