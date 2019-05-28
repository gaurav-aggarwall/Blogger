// Blog Model
const Blog = require('../models/Blog');

// User Model
const User = require('../models/User');

// Get all the Blogs
exports.getAll = (req, res, next) => {
    Blog.find()
    .then(blogs => {
        res.status(200).json({
            message: 'Blogs fetched successfully',
            blogs: blogs
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Get all the Blogs
exports.getSinglePost = (req, res, next) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(blog => {
        if(!blog){
            const error = new Error('Can not find the blog');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Blog fetched successfully',
            blog: blog
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Creating a New Blog
exports.newBlog = (req, res, next) => {
    const { title, body, imageURL } = req.body;
    let author = req.userId;

    if(!author || !title || !body || !imageURL){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }           

    const newBlog = new Blog({ author, title, body, imageURL });

    newBlog.save()
    .then(blog => User.findById(author))
    .then(user => {
        author = user;
        user.blogs.push(newBlog);
        return user.save();
    })
    .then( blog => {    
        res.status(201).json({
            message: 'Blog was posted successfully',
            blog: newBlog,
            author: {
                _id: author._id,
                name: author.name
            }
        });    
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Editing a Blog
exports.editBlog = (req, res, next) => {
    const { title, body, imageURL } = req.body;
    let author = req.userId;
    const id = req.params.id;

    if(!author || !title || !body || !imageURL){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }   

    Blog.findById(id)
    .then(blog => {

        if(!blog){
            const error = new Error('Can not find the blog');
            error.statusCode = 404;
            throw error;
        }

        // Authorization
        if((blog.author._id).toString() !== req.userId){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        blog.author = author;
        blog.title = title;
        blog.body = body;
        blog.imageURL = imageURL;

        return blog.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Post edited successfully',
            post: result
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Deleting a blog
exports.deleteBlog = (req, res, next) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(blog => {

        if(!blog){
            const error = new Error('Can not find the blog');
            error.statusCode = 404;
            throw error;
        }

        // Authorization
        if((blog.author._id).toString() !== req.userId){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        return Blog.findByIdAndDelete(id);
    })
    .then(result => User.findById(req.userId))
    .then(user => {
        user.blogs.pull(id);
        return user.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Post deleted successfully' });
    })    
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}