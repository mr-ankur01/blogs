const jwt = require('jsonwebtoken')
const Admindb = require('../models/admindb')


const requireAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt2
        if (token) {
             jwt.verify(token, 'hi123', async (err, decodedToken) => {
                if (err) {
                    res.redirect('/')
                } else {
                    const admin = await Admindb.findById(decodedToken.id)
                        res.locals.user = admin.username
                        next()
                    }
            })
        }else{
            res.redirect('/')
        }
    } catch (err) {
        next()
    }
} 


module.exports = {
    requireAdmin,
}