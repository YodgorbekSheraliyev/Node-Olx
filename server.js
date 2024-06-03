const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Importing ENV variables
dotenv.config()

// Connecting to DB
connectDB()

// Getting instance of express
const app = express()

// Body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static folders
app.use(express.static(path.join(__dirname, 'public')))

// Setting engine 
app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Initialize routes
app.use('/', require('./routes/home.route'))
app.use('/posters', require('./routes/poster.route'))

// Set up port
const PORT = process.env.PORT || 3000


// Listeners
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))