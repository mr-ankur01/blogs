const express = require('express');
const routers = express.Router();
const controls = require('../controllers/controls');

routers.get('/',controls.blogspage);

routers.post('/',controls.createblogs);

routers.get('/:id',controls.blogfind);

routers.delete('/:id',controls.deleteblog);

module.exports = routers;