/* eslint-disable no-async-promise-executor */
export default class {
    #flight
    #title
    #loading

    constructor(title) {
        this.#loading = true
        this.#title = title
    }

    #loadFlight(title) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbQuery = SELECT
                    .from(cds.entities.Books)
                    .where({ title: title })
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

    async #waitForLoad() {
        this.#flight = await this.#loadFlight(this.#title)
        this.#loading = false
    }

    async getBookDetails() {
        if(this.#loading){await this.#waitForLoad()}
        return this.#flight
    }

    async calculateBookPrice() {
        if(this.#loading){await this.#waitForLoad()}
        let price
        let results = this.#flight
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
        return { "price": price, "currency": results[0].currency_code }
    }

}