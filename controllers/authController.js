const Authdb = require('../models/authdb');
const jwt = require('jsonwebtoken');


//Errors handle from the database
const handleError = err => {
    console.log(err.message, err.code)
    let errors = ''

    if (err.code === 11000) {
        errors = 'This email is already exist'
    }

    else if (err.message === 'Incorrect Password') {
        errors = 'Password is incorrect'

    }
    else if (err.message === 'Incorrect Email') {
        errors = 'This email does not exist'

    }
    else if (err.message.includes('Auth validation failed')) {
        errors = ' The password should greater than 4'
    }

    return errors
}

const expiresIn = 3 * 24 * 60 * 60
const create_token = id => {
    const token = jwt.sign({ id }, 'hi123', { expiresIn })
    return token
}

const logindata = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Authdb.login(email, password)
        const token = create_token(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: expiresIn * 1000 })
        res.cookie('role', 'user', { httpOnly: true, maxAge: expiresIn * 1000 })
        res.redirect('/')

    } catch (err) {
        const errors = handleError(err)
        await req.flash('error', errors)
        res.redirect('/auth/login')
    }

}


const signData = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        await Authdb.create([{ email, password }])
        res.redirect('/auth/login')

    } catch (err) {
        const errors = handleError(err)
        req.flash('error', errors)
        res.redirect('/auth/sign')
    }
}

const logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.redirect('/auth/login')
}

module.exports = {
    logindata,
    signData,
    logout,
}