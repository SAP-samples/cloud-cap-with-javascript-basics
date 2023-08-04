import {swagger} from './swagger.js'
import expressSecurity from './expressSecurity.js'
import healthCheck from './healthCheck.js'
import overloadProtection from './overloadProtection.js'
import expressStatusMonitor from 'express-status-monitor'

export default function (app, cds) {
    app.log = cds.log('nodejs')
    app.cds = cds
    app.log(`Custom Express Startup`)
    app.swagger = new swagger()
    expressSecurity(app)

    healthCheck(app)
    overloadProtection(app)
    app.use(expressStatusMonitor())

}