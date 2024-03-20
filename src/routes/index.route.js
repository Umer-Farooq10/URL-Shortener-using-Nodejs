const express = require('express')
const urlRoute = require('./url.route')

router = express.Router()

router.use('/api/v1/url', urlRoute)

module.exports = router
