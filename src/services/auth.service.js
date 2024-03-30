require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

const setUser = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
    },
    secret_key)
}

const getUser = (token) => {
    if (!token) return null
    try {
        return jwt.verify(token, secret_key)
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}
