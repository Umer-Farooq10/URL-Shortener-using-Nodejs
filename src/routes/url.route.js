const express = require('express')
const { GetAllUrls, GenerateShortURL } = require('../controllers/url.controller')

const router = express.Router()

router.get('/', GetAllUrls)
router.post('/', GenerateShortURL)

module.exports = router
