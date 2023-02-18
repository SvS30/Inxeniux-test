const express = require("express"),
    dotenv = require("dotenv"),
    Mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    swaggerUi = require('swagger-ui-express');

const connectionMongoDB = require('./config/database'),
    userRoutes = require('./routes/users'),
    swaggerSpecs = require('./config/swagger');

const app = express();

dotenv.config({ path: '.env' })

// body parse from application/json
app.use(bodyParser.json())
// Set CORS config
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/api/users', cors(), userRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.get('/', (req, res) => { res.status(200).json({ 'message': 'Hello from backend' }) })

const PORT = process.env.BACKEND_PORT || 8000;

connectionMongoDB().then(res => {
    console.log(`MongoDB connected successfully: ${res.connection.host}:${res.connection.port}/${res.connection.name}`)
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));
}).catch(error => {
    console.log(`Server down\n${error}`)
    Mongoose.disconnect()
    process.exit(1)
})