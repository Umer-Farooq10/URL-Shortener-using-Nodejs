require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.route')
const DBConnection = require('./config/DBConnection')

const app = express()
const PORT = process.env.PORT || 3000

app.use('/', routes)

DBConnection()

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})
