const express = require('express')
const urlRoutes = require('./url.route')
const userRoutes = require('./user.route')
const { GetUrlByIdAndUpdate } = require('../controllers/url.controller')
const { restrictToLoggedInUserOnly } = require('../middlewares/auth.middleware')

router = express.Router()

router.use('/api/urls', restrictToLoggedInUserOnly, urlRoutes)
router.use('/api/users', userRoutes)

router.get('/:shortId', GetUrlByIdAndUpdate)

module.exports = router
