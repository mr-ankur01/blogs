const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:String,
    password:String,
},{timestamp:true});

const AdminModel = mongoose.model('Admin',adminSchema);

module.exports = AdminModel;