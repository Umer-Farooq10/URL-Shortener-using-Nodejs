require('dotenv').config()
const mongoose = require('mongoose')

const URL = process.env.DB_CONNECTION_STRING

async function DBConnection() {
    try{
        await mongoose.connect(URL)
        console.log('Connected to DB')
    } catch (err) {
        console.log(`Error while connecting to DB: ${err.message}`);
        process.exit(1);
    }
}

module.exports = DBConnection
