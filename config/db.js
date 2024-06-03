const mongoose = require('mongoose')

const connectDB = async () => {
    const connection  = await mongoose.connect('mongodb://127.0.0.1:27017/postersapp')
    console.log(`MongoDB connected to ${connection.connection.host}`)
}

module.exports = connectDB