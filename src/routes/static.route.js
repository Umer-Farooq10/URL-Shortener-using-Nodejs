const express = require('express')
const URL = require('../models/url.model')
const { checkAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', checkAuth, async (req, res) => {
    if (!req.user) return res.redirect('/api/users/login')
    const urls = await URL.find({ createdBy: req.user.id });
    if (urls.length === 0) {
        return res.render('index', { urls: 0 })
    }
    return res.render('index', { urls })
})

module.exports = router
