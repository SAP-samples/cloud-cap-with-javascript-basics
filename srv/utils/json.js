/**
@function Puts a JSON object into the Response Object
@param {object} jsonOut - JSON Object
@param {object} res - response object from Express
*/
export default function(jsonOut, res) {
    let out = []
    for (let item of jsonOut) {
        out.push(item)
    }
    res.type("application/json").status(200).send(JSON.stringify(out))
    return
}