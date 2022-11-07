const jwt = require('jsonwebtoken');
const Authdb = require('../models/authdb')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'hi123', (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/auth/login')
            }
            else {
                next()
            }
        })
    } else {
        res.redirect('/auth/login')
    }

}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'hi123', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null
                next()
            } else {
                const user = await Authdb.findById(decodedToken.id)
                res.locals.user = user.email;
                next()
            }
        })

    } else {
        res.locals.user = null
        next()
    }

}

const reqRole = (permissions)=>{
    return (req,res,next)=>{
        const role = req.cookies.role
        if(permissions.includes(role)){
            next()
        }else{
            res.redirect('/auth/login')
        }
    }
}

module.exports = {
    requireAuth,
    checkUser,
    reqRole
}