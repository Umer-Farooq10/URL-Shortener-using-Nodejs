const express = require('express')
const { GetAllUrls, GenerateShortURL, GetUrlAnalytics } = require('../controllers/url.controller')

const router = express.Router()

router.get('/', GetAllUrls)
router.get('/analytics/:shortId', GetUrlAnalytics)
router.post('/', GenerateShortURL)

module.exports = router
