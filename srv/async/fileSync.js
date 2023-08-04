import fs from 'fs'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
import * as path from 'path'

export default function (wss) {
    let text = fs.readFileSync(path.join(__dirname, "./file.txt"), "utf8")
    wss.broadcast(text)

    wss.broadcast("After First Read\n")

    text = fs.readFileSync(path.join(__dirname, "./file2.txt"), "utf8")
    wss.broadcast(text)

    wss.broadcast("After Second Read\n")
}