const USER = require('../models/user.model')
const { setUser } = require('../services/auth.service')

const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Please provide valid username, email and password!' })
        }
        await USER.create({ username, email, password, role })
        return res.redirect('/api/users/login')
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred.", message: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).send({ message: 'Please provide username and password!' })
        }
        const user = await USER.findOne({ username, password })
        if (!user) {
            return res.render('login', { error: 'Please provide valid username and password!' })
        }
        const token = setUser(user)
        // res.cookie("uid", token)
        // return res.redirect('/')
        return res.json({ token })
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred.", message: error.message });
    }
}

module.exports = {
    createUser,
    userLogin
}
