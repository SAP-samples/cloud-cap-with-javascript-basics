import swaggerJSDoc from 'swagger-jsdoc'
export function swagger() {
    this.getOpenAPI = async () => {     
        let options = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'JavaScript Nodejs Examples',
                    version: '1.0.0'
                },
            },
            apis: ['./srv/routes/*']
        }
        var swaggerSpec = swaggerJSDoc(options)
        swaggerSpec.components.requestBodies = []
        return swaggerSpec 
    }
}