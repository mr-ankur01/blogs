const jwt = require('jsonwebtoken')
const Admindb = require('../models/admindb')


const requireAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (token) {
             jwt.verify(token, 'hi123',async (err, decodedToken) => {
                if (err) {
                    res.redirect('/auth/login')
                } else {
                    const admin = await Admindb.findById(decodedToken.id)
                    if(admin){
                        res.locals.user = admin.username
                        next()
                    }else{
                        res.redirect('/auth/login')
                    }
                    next()
                }
            })
        }
    } catch (err) {
        next()
    }
} 


module.exports = {
    requireAdmin,
}