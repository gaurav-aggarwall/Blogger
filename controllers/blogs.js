// Blog Model
const Blog = require('../models/Blog');


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
    const { author, title, body, imageURL } = req.body;

    if(!author || !title || !body || !imageURL){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }           

    const newBlog = new Blog({ author, title, body, imageURL });

    newBlog.save()
    .then(blog => res.status(201).json({
        message: 'Blog was posted successfully',
        blog: blog
    }))
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Deleting a blog
exports.deleteBlog = (req,res) => {
    const id = req.params.id;

    if(!id) return res.status(400).json({ message: 'Please select a particular blog to delete' });

    Blog.findById(id)
        .then(blog => {
            blog.remove()
                .then( blog => {
                    res.json({msg: 'Deleted', blog});
                }).catch(err => res.status(40).json({ message: 'Blog Not Found' }));
        }).catch(err => res.status(404).json({ msg: 'Blog Not Found' }));
}