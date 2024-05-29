const mongoose = require('mongoose')

const connectDB = async () => {
  const connecting = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  console.log(`MongoDB connecto to: ${connecting.connection.host}`)
}

module.exports = connectDB