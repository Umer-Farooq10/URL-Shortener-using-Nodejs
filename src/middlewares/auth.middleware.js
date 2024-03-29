const { getUser } = require('../services/auth.service')

const restrictToLoggedInUserOnly = (req, res, next) => {
    const userUid = req.cookies?.uid
    if (!userUid) return res.redirect('/api/users/login')

    const user = getUser(userUid)
    if (!user) return res.redirect('/api/users/login')

    req.user = user
    next()
}

const checkAuth = (req, res, next) => {
    const userUid = req.cookies?.uid
    const user = getUser(userUid)
    req.user = user
    next()
}

const isLoggedIn = (req, res, next) => {
    const userUid = req.cookies?.uid;
    if (userUid) {
        return res.redirect('/');
    }
    next();
};

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
    isLoggedIn
}

// const { getUser } = require('../services/auth.service');

// const restrictToLoggedInUserOnly = async (req, res, next) => {
//     const userUid = req.cookies?.uid;
//     if (!userUid) return res.redirect('/api/users/login');

//     try {
//         const user = await getUser(userUid);
//         if (!user) return res.redirect('/api/users/login');

//         req.user = user;
//         next();
//     } catch (error) {
//         // Handle any errors that occur during JWT verification
//         console.error('Error verifying JWT:', error);
//         return res.redirect('/api/users/login');
//     }
// };

// const checkAuth = async (req, res, next) => {
//     const userUid = req.cookies?.uid;
//     console.log('User UID from cookie:', userUid); // Debugging log
//     try {
//         const user = await getUser(userUid);
//         console.log('User from JWT verification:', user); // Debugging log
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Error verifying JWT:', error);
//         return res.redirect('/api/users/login');
//     }
// };


// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth
// };
