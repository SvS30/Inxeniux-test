const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.BACKEND_PORT || 80;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Inxeniux APIDOC with Swagger",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "Apache-2.0",
                url: "https://spdx.org/licenses/Apache-2.0.html",
            },
            contact: {
                name: "Salim Vazquez Solis",
                url: "https://salimv.netlify.app",
                email: "salimvzqz@gmail.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}/`,
                description: 'Development Server'
            },
        ],
    },
    apis: ["./backend/routes/**.js"],
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs