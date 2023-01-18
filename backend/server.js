const express = require("express")
const dotenv = require("dotenv")
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')

const connectionMongoDB = require('./config/database')
const userRoutes = require('./routes/users')

const app = express();

dotenv.config({ path: '.env' })

// body parse from application/json
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

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