import health from '@cloudnative/health-connect'
import lag from 'event-loop-lag'

export default function (app) {
    app.log(`Custom health checks at /healthcheck`)
    let healthcheck = new health.HealthChecker()
    const lagHealth = () => new Promise((resolve, _reject) => {
        let lagCheck = lag(1000)
        if(lagCheck() > 40){
          _reject(`Event Loop Lag Exceeded: ${lagCheck()} milliseconds`) 
        }
        resolve()
    })
    let lagCheck = new health.LivenessCheck("Event Loop Lag Check", lagHealth)
    healthcheck.registerLivenessCheck(lagCheck)
    app.use('/live', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck))
    app.use('/health', health.HealthEndpoint(healthcheck))
    app.use('/healthcheck', health.HealthEndpoint(healthcheck))
}