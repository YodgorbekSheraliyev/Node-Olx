const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const moment = require('moment')
const exphbs = require('express-handlebars')
const paginate = require('handlebars-paginate')
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

// Middlewares
app.use(flash())

// Static folders
app.use(express.static(path.join(__dirname, 'public')))

// Setting engine 
app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout: "main", helpers: {
    formatDate: function(time, format){
        return moment(time).format(format)
    },
    paginate: paginate
}}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Initialize routes
app.use('/', require('./routes/home.route'))
app.use('/posters', require('./routes/poster.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/profile', require('./routes/profile.route'))

// Set up port
const PORT = process.env.PORT || 1000

// Listeners
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))