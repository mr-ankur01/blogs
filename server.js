const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
const Blogdb = require('./models/blogdb');


const blogsrouters = require('./routers/blogsRouters')
const authrouters = require('./routers/auth')
const adminRouters = require('./routers/admin')
const { requireAuth, checkUser } = require('./middlewares/authMid')


const session = require('express-session');
const flash = require('connect-flash');

const cookieParser = require('cookie-parser')


mongoose.connect('mongodb://localhost:27017/blogs')
    .then((result) => app.listen(9898, console.log('server start at: http://localhost:9898')))
    .catch((err) => console.log(err));

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'thisisasecretkey',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
});


app.use(cookieParser())

app.use('*', checkUser)

app.get('/', requireAuth(['admin', 'user']), async (req, res) => {
    try {
        let blogs = await Blogdb.find()
        blogs.forEach(blog => {
            let {body} = blog
            blog.body = body.slice(0,310)
        });
        res.render('blogs/index', { blogs })
    } catch (err) {
        console.log(err);
    }

});


app.use('/blog', requireAuth(['admin', 'user']), blogsrouters);
app.use('/auth', authrouters);
app.use('/admin', adminRouters);

app.use((req, res) => {
    res.status(404).render('blogs/404');
});