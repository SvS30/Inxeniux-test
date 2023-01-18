const mongoose = require('mongoose')

const connectionMongoDB = async () => {
    mongoose.set('strictQuery', true)
    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 60000,
    });
    return connection;
}

module.exports = connectionMongoDB