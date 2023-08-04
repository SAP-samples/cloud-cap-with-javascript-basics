
export function callDB(wss) {
    try {
        let dbQuery = SELECT
            .from(cds.entities.Books)
            .columns("title", "price")
            .limit(10)
        wss.broadcast("Database Connected")
        cds.run(dbQuery)
            .then(results => {
                wss.broadcast("Database Call Complete")
                for (const item of results) {
                    wss.broadcast(`${item.title}: ${item.price}\n`)
                }
            })
            .catch(error => {
                cds.log('nodejs').error(error)
            })
    } catch (e) {
        cds.log('nodejs').error(e)
    }
}

export function callDB1(wss) {
    try {
        let dbQuery = SELECT
            .from(cds.entities.Books)
            .columns("title", "price")
            .limit(25)
        wss.broadcast("Database Connected #1")
        cds.run(dbQuery)
            .then(results => {
                wss.broadcast("Database Call  #1")
                wss.broadcast("--Books")
                for (const item of results) {
                    wss.broadcast(`${item.title}: ${item.price}\n`)
                }
                wss.broadcast("End Waterfall #1")
            })
            .catch(error => {
                cds.log('nodejs').error(error)
            })
    } catch (e) {
        cds.log('nodejs').error(e)
    }
}

export function callDB2(wss) {
    try {
        let dbQuery = SELECT
            .from(cds.entities.Authors)
            .columns("name", "dateOfBirth")
            .limit(2)
        wss.broadcast("Database Connected #2")
        cds.run(dbQuery)
            .then(results => {
                wss.broadcast("Database Call  #2")
                wss.broadcast("--Authors")
                for (const item of results) {
                    wss.broadcast(`${item.name}: ${item.dateOfBirth}\n`)
                }
                wss.broadcast("End Waterfall #2")
            })
            .catch(error => {
                cds.log('nodejs').error(error)
            })
    } catch (e) {
        cds.log('nodejs').error(e)
    }
}

export async function callDB3(wss) {
    try {
        let dbQuery = SELECT
            .from(cds.entities.Books)
            .columns("title", "price")
            .limit(25)
        wss.broadcast("Database Connected #1")
        const results = await cds.run(dbQuery)
        wss.broadcast("Database Call  #1")
        wss.broadcast("--Books")
        for (const item of results) {
            wss.broadcast(`${item.title}: ${item.price}\n`)
        }
        wss.broadcast("End Waterfall #1")
    } catch (e) {
        cds.log('nodejs').error(e)
    }
}

export async function callDB4(wss) {
    try {
        let dbQuery = SELECT
            .from(cds.entities.Authors)
            .columns("name", "dateOfBirth")
            .limit(2)
        wss.broadcast("Database Connected #2")
        const results = await cds.run(dbQuery)
        wss.broadcast("Database Call  #2")
        wss.broadcast("--Authors")
        for (const item of results) {
            wss.broadcast(`${item.name}: ${item.dateOfBirth}\n`)
        }
        wss.broadcast("End Waterfall #2")
    } catch (e) {
        cds.log('nodejs').error(e)
    }
}