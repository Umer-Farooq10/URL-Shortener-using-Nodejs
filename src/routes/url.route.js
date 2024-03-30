const express = require('express')
const { GetAllUrls, GenerateShortURL, GetUrlAnalytics } = require('../controllers/url.controller')
const { restrictTo } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', restrictTo(['admin']), GetAllUrls)
router.get('/analytics/:shortId', GetUrlAnalytics)
router.post('/', GenerateShortURL)

module.exports = router
