import fs from 'fs'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
import * as path from 'path'

export default function (wss) {
    fs.readFile(path.join(__dirname, "./file.txt"), "utf8", (error, text) => {
        if(error){
            cds.log('nodejs').error(error)
        }
        wss.broadcast(text)
    })
    wss.broadcast("After First Read\n")

    fs.readFile(path.join(__dirname, "./file2.txt"), "utf8", (error, text) => {
        if(error){
            cds.log('nodejs').error(error)
        }
        wss.broadcast(text)
    })
    wss.broadcast("After Second Read\n")
}