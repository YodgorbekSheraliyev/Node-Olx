const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const helmet = require('helmet')
const compression = require('compression')
const dotenv = require('dotenv')
const helpers = require('./utils/hbsHelpers')
const connectDB = require('./config/db')

//Env variables
dotenv.config()

//Connecting to database
connectDB()

const app = express()

//Initilaize session store
const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO_URI
})

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Register handlebars helpers
helpers(Handlebars)

//Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(flash())
//app.use(helmet())
//app.use(compression())

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Initialize template engine (Handlebars)
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')


//Initialize routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/posterRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/profile', require('./routes/profileRoutes'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})