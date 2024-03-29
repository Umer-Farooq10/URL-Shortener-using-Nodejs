const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                return urlRegex.test(value);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shortId: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const shortUrlRegex = /^[a-zA-Z0-9._-]+$/;
                return shortUrlRegex.test(value);
            },
            message: props => `${props.value} is not a valid short URL!`
        }
    },
    visitorsHistory: [{
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
