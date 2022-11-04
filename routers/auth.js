const express = require('express');
const routers = express.Router();
const authCont = require('../controllers/authController');

routers.get('/login', (req, res) => {
    res.render('auth/login');
});

routers.post('/login', authCont.logindata);

routers.get('/sign', (req, res) => {
    res.render('auth/sign')
});

routers.post('/sign', authCont.signData);


module.exports = routers;