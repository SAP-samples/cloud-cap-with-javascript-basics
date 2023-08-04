export default function (wss) {
    wss.broadcast("Start")
    setTimeout(() => {
        wss.broadcast("Wait Timer Over")
    }, 3000)
    wss.broadcast("End")
}