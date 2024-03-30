const { getUser } = require('../services/auth.service')

const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token
    req.user = null
    if (!tokenCookie) {
        // return res.redirect('/api/users/login')
        return next()
    }
    const user = getUser(tokenCookie)
    // if (!user) return res.redirect('/api/users/login')
    req.user = user
    next()
}

const restrictTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.redirect('/api/users/login')
        if (!roles.includes(req.user.role)) {
            return res.end('Unauthorized')
        }
        return next()
    }
}

const isLoggedIn = (req, res, next) => {
    const userUid = req.cookies?.token;
    if (userUid) {
        return res.redirect('/');
    }
    next();
};

module.exports = {
    checkForAuthentication,
    restrictTo,
    isLoggedIn
}
