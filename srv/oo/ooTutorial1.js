export default class {
    constructor(id) {
        this.id = id
    }
    myFirstMethod(import1) {
        if (import1 === 20) {
            let error = {}
            error.message = "Something Bad Happened"
            error.value = import1
            throw error
        }
        return import1
    }
}