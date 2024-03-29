const express = require('express')
const { createUser, userLogin } = require('../controllers/user.controller')
const { isLoggedIn } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/create', createUser)
router.post('/login', userLogin)

router.get('/signup', isLoggedIn, (req, res) => {
    return res.render('signup')
})

router.get('/login', isLoggedIn, (req, res) => {
    return res.render('login')
})

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/api/users/login');
});

module.exports = router
