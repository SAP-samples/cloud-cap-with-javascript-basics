import { WebSocketServer } from 'ws'
import toc from '../utils/exampleTOC.js'
import asyncLib from '../async/async.js'
import dbAsync from '../async/databaseAsync.js'
import dbAsync2 from '../async/databaseAsync2.js'
import fileSync from '../async/fileSync.js'
import fileAsync from '../async/fileAsync.js'
import httpClient from '../async/httpClient.js'
import httpClient2 from '../async/httpClient2.js'

export function load(app, server) {
    app.use('/rest/excAsync', (req, res) => {
        let output =
            `<H1>Asynchronous Examples</H1></br> 
			<a href="/exerciseAsync">/exerciseAsync</a> - Test Framework for Async Examples</br>` +
            toc()
        res.type("text/html").status(200).send(output)
    })

    try {
        //Create Server
        var wss = new WebSocketServer({
            noServer: true,
            path: "/rest/excAsync"
        })

        //Handle Upgrade Event
        server.on("upgrade", (request, socket, head) => {
            console.log(request.url)
            if (request.url === '/rest/excAsync') {
                wss.handleUpgrade(request, socket, head, (ws) => {
                    wss.emit("connection", ws, request)
                })
            }
        })

        //Broadcast function
        wss.broadcast = (data, progress) => {
            let message = JSON.stringify({
                text: data,
                progress: progress
            })
            wss.clients.forEach((client) => {
                try {
                    client.send(message, (error) => {
                        if (error !== null && typeof error !== "undefined") {
                            cds.log('nodejs').error(`Send Error: ${error}`)
                        }
                    })
                } catch (e) {
                    cds.log('nodejs').error(`Broadcast Error: ${e}`)
                }
            })
            cds.log('nodejs').info(`Sent: ${message}`)
        }

        //Web Socket Error Handler 
        wss.on("error", (error) => {
            cds.log('nodejs').error(`Web Socket Server Error: ${error}`)
        })

        //Web Socket Connection
        wss.on("connection", (ws) => {
            cds.log('nodejs').info("Connected")

            //Web Socket Message Received
            ws.on("message", (message) => {
                cds.log('nodejs').info(`Received: ${message}`)
                let data = JSON.parse(message)
                switch (data.action) {
                    case "async":
                        asyncLib(wss)
                        break
                    case "fileSync":
                        fileSync(wss)
                        break
                    case "fileAsync":
                        fileAsync(wss)
                        break
                    case "httpClient":
                        httpClient(wss)
                        break
                    case "httpClient2":
                        httpClient2(wss)
                        break
                    case "dbAsync":
                        dbAsync(wss)
                        break
                    case "dbAsync2":
                        dbAsync2(wss)
                        break
                    default:
                        wss.broadcast(`Error: Undefined Action: ${data.action}`)
                        break
                }
            })

            //Web Socket Connection Close
            ws.on("close", () => {
                cds.log('nodejs').info("Closed")
            })

            //Web Socket Connection Error
            ws.on("error", (error) => {
                cds.log('nodejs').error(`Web Socket Error: ${error}`)
            })

            ws.send(JSON.stringify({
                text: "Connected to Exercise 3"
            }), (error) => {
                if (error !== null && typeof error !== "undefined") {
                    cds.log('nodejs').error(`Send Error: ${error}`)
                }
            })
        })

    } catch (e) {
        cds.log('nodejs').error(e)
    }
    return app
}