const fs = require('fs')
const path = require('path')
const mongoose =require('mongoose')
const dotenv = require('dotenv')

// Env variables 
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGO_URI) 

// Import models
const User = require('./models/user.model')
const Poster = require('./models/poster.model')

// Create path 
const usersPath = path.join(__dirname, '_data', 'users.json')
const postersPath = path.join(__dirname, '_data', 'posters.json')

// Json data
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
const posters = JSON.parse(fs.readFileSync(postersPath, 'utf-8'))

// Import data

const importData = async () => {
    try {
        await User.create(users)
        await Poster.create(posters)

        console.log("Data imported to DB")
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Poster.deleteMany()

        console.log("Data deleted")
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}
