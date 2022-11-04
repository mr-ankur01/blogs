const express = require('express');
const routers = express.Router();
const adminCon = require('../controllers/adminController');



routers.get('/',(req,res)=>{
    res.render('admin/admin')
});

routers.get('/login',(req,res)=>{
    res.render('admin/login')
});

routers.get('/sign',(req,res)=>{
    res.render('admin/sign')
});

routers.get('/users',adminCon.users);
routers.delete('/users/:id',adminCon.usersDel);

routers.post('/login',adminCon.login);
routers.post('/sign',adminCon.sign);
routers.post('/',adminCon.admin);



module.exports =routers;