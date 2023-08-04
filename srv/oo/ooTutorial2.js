/* eslint-disable no-async-promise-executor */
export default class {
    static async getBookDetails(title) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbQuery = SELECT
                    .from(cds.entities.Books)
                    .where({title: title})
               resolve(await cds.run(dbQuery))
            } catch (err) {
                let error = {}
                error.message = "Invalid Book"
                error.title = title
                error.details = err
                reject(error)
            }
        })
    }

    static async calculateBookPrice(title) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbQuery = SELECT
                    .from(cds.entities.Books)
                    .where({title: title})
                    .limit(1)
                const results = await cds.run(dbQuery)
                let price
                switch (results[0].genre_ID) {
                    case 14:  //Science Fiction
                        price = results[0].price * 1 + 40
                        break
                    case 11:  //Drama
                        price = results[0].price * 1 + 25
                        break
                    default:
                        price = results[0].price * 1 + 10
                        break
                }
                resolve({"price": price, "currency": results[0].currency_code })
            } catch (err) {
                let error = {}
                error.message = "Invalid Book"
                error.title = title
                error.details = err
                reject(error)
            }
        })
    }
}