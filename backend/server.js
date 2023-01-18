const express = require("express");

const app = express();

const PORT = process.env.BACKEND_PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));

app.get('/', (req, res) => { res.status(200).json({ 'message': 'Hello from backend' }) })