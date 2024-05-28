const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')

dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Initialize routes
app.use('/', require('./routes/home.route'))
app.use('/posters', require('./routes/poster.route'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))