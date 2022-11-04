const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        reqiured: true,
        minlength: [4, 'The password should greater than 4']
    }
}, { timestamp: true });

// pre function for password hashing 
authSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()

})

authSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const pass =await bcrypt.compare(password,user.password)
        if(pass){
            return user
        }throw Error("Incorrect Password")
    }throw Error("Incorrect Email")
}

const AuthModel = mongoose.model('Auth', authSchema);

module.exports = AuthModel;