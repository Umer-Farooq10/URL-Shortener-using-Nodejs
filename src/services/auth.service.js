const jwt = require('jsonwebtoken')
const secret = 'Umer@#123'

const setUser = (user) => {
    return jwt.sign({ id: user._id, name: user.username, email: user.email }, secret)
}

const getUser = (token) => {
    if (!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}
