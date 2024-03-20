const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    trackVisiters: [{

    }]
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url
