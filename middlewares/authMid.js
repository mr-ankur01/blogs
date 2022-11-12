const jwt = require('jsonwebtoken');
const Authdb = require('../models/authdb')
const Admindb = require('../models/admindb')

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'hi123', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                const user = await Authdb.findById(decodedToken.id)
                if (user) {
                    res.locals.user = user.email;
                    next()
                }
                else {
                    const admin = await Admindb.findById(decodedToken.id)
                    res.locals.user = admin.username
                    next()
                }
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

const requireAuth = Role => {
    return (req, res, next) => {
        const token = req.cookies.jwt;
        const role = req.cookies.role;
        if (Role.includes(role)) {
            if (token) {
                jwt.verify(token, 'hi123', (err, decodedToken) => {
                    if (err){
                        req.flash('error','you dont have any permissions')
                        res.redirect('/auth/login')
                    }
                    else
                        next()
                })
            }
            else{
                req.flash('error','you dont have any permissions')
                res.redirect('/auth/login')
            }
        }
        else{
            req.flash('error','you dont have any permissions')
            res.redirect('/auth/login')
        }
    }
}



module.exports = {
    requireAuth,
    checkUser,
}