const Admindb = require('../models/admindb');
const Userdb = require('../models/authdb');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admindb.findOne({ username })
        .then(result => {
            if (result == null) {
                req.flash('error', 'Error! username not found!')
                res.redirect("/admin/login")
            }
            else {
                const comPass = bcrypt.compareSync(password, result.password);
                if (comPass) {
                    res.redirect('/admin');

                } else {
                    req.flash('error', 'Error! password is wrong!')
                    res.redirect("/admin/login")
                }

            }
        })
}


const sign = (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    const cpass = req.body.cpassword;

    Admindb.findOne({ username })
        .then(result => {
            if (result == null) {
                if (!(pass === cpass)) {
                    console.log('pass not match');
                    req.flash('error', 'Error! Confirm password does not match');
                    res.redirect('/admin/sign')
                }
                else {
                    hashPass = bcrypt.hashSync(pass, 10);
                    const authobj = new Admindb({ username, password: hashPass });
                    authobj.save()
                        .then(result => {
                            req.flash('error', 'Account created successfully.');
                            res.redirect('/admin/login')
                        })
                        .catch(err => console.log(err))
                }
            }
            else {
                req.flash('error', 'Error! Username already exists');
                res.redirect('/admin/sign')
            }
        })
        .catch(err => {
            console.log(err)
        });

}


const admin = (req, res) => {
    res.render('admin/admin');
}


const users = async (req, res) => {
    const users = await Userdb.find()
    res.render('admin/users', { users })
}

const usersDel = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await Userdb.findByIdAndDelete(id);
        if (del)
            res.status(201).json({redirect:'/admin/users'})
    }catch(err){
        console.log(err)
    }
    
}


module.exports = {
    login,
    sign,
    admin,
    users,
    usersDel,
}