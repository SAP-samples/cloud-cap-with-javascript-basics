import ooTutorial3 from "./ooTutorial3.js";
export default class extends ooTutorial3 {
    constructor(title) {
        super(title)
    }

    async calculateBookPrice() {
        let newPrice = await super.calculateBookPrice()
        newPrice.price = newPrice.price * 1.25
        return newPrice
    }
}