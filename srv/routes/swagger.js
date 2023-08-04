import swaggerUI from 'swagger-ui-express'
export async function load (app) {
    //const swaggerUi = require('swagger-ui-express')
	const swaggerSpec = await app.swagger.getOpenAPI()

	app.get('/apiJS/api-docs.json', function (req, res) {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})
	let options = {
		explorer: true,
		swaggerOptions: {
			docExpansion: "none",
            basePath: '/apiJS'
		}
	}
	app.use('/apiJS/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, options))
}