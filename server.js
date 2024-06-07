const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Importing ENV variables
dotenv.config()

// Connecting to DB
connectDB()

// Getting instance of express
const app = express()

// Initialize session store
const store = new MongoStore({
    collection: "user_sessions",
    uri: process.env.MONGO_URI
})

// Body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false
}))

// Static folders
app.use(express.static(path.join(__dirname, 'public')))

// Setting engine 
app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Initialize routes
// app.use('/', require('./routes/home.route'))
// app.use('/posters', require('./routes/poster.route'))
// app.use('/auth', require('./routes/auth.route'))
// app.use('/profile', require('./routes/profile.route'))

// Set up port
const PORT = process.env.PORT || 1000


// Listeners
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))