require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./routes/index.route')
const staticRoutes = require('./routes/static.route')
const DBConnection = require('./config/DBConnection')
const { checkForAuthentication, restrictTo } = require('./middlewares/auth.middleware')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use('/', routes)
app.use('/', restrictTo(['normal', 'admin']), staticRoutes)

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))

DBConnection()

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})
