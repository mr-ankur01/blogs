const Blogdb = require('../models/blogdb');



const blogspage = (req,res)=>{
    res.render('blogs/createblogs');
}

const createblogs =(req,res)=>{
    const Blog = new Blogdb(req.body)
    Blog.save()
    .then((data)=>res.redirect('/'))
    .catch(err=>console.log(err));
    
}

const blogfind = (req,res)=>{
    Blogdb.findById(req.params.id)
    .then(blog => res.render('blogs/viewblog',blog))
    .catch(err => console.log(err));
}

const deleteblog =(req,res)=>{
    Blogdb.findByIdAndDelete(req.params.id)
    .then(result => res.json({redirect:'/'}))
    .catch(err => console.log(err))
}

module.exports = {
    blogspage,
    createblogs,
    blogfind,
    deleteblog
}