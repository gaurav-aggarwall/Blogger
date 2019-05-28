// Comment Model
const Comment = require('../models/Comment');

// User Model
const User = require('../models/User');

// User Model
const Blog = require('../models/Blog');



// Creating a New Blog
exports.newComment = (req, res, next) => {
    const { body } = req.body;
    let author = req.userId;
    const blog = req.params.id;

    if(!author || !body || !blog){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }           

    const newComment = new Comment({ author, body, blog });

    newComment.save()
    .then(comment => User.findById(author))
    .then(user => {
        author = user;
        user.comments.push(newComment);
        return user.save();
    })
    .then(user => Blog.findById(blog))
    .then(blog => {
        blog.comments.push(newComment);
        return blog.save();
    })
    .then( blog => {    
        res.status(201).json({
            message: 'Comment was posted successfully',
            _id: newComment._id,
            blog: blog._id,
            author: {
                _id: author._id,
                name: author.name
            },
            body
        });    
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


// Editing a Comment
exports.editComment = (req, res, next) => {
    const { body } = req.body;
    let author = req.userId;
    const id = req.params.id;

    if(!author || !body || !id){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }    

    Comment.findById(id)
    .then(comment => {
        
        if(!comment){
            const error = new Error('Can not find the comment');
            error.statusCode = 404;
            throw next(error);
        }

        // Authorization
        if((comment.author._id).toString() !== req.userId){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        comment.body = body;

        return comment.save();
    })
    .then(comment => {
        res.status(200).json({
            message: 'Comment edited successfully',
            _id: id,
            blog: comment.blog._id,
            author: {
                _id: comment.author._id,
                name: comment.author.name
            },
            body: comment.body
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
exports.deleteComment = (req, res, next) => {
    const id = req.params.id;
    let blogId;

    Comment.findById(id)
    .then(comment => {

        if(!comment){
            const error = new Error('Can not find the comment');
            error.statusCode = 404;
            throw next(error);
        }

        // Authorization
        if((comment.author._id).toString() !== req.userId){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        blogId = comment.blog;
        return Comment.findByIdAndDelete(id);
    })
    .then(result => User.findById(req.userId))
    .then(user => {
        user.comments.pull(id);
        return user.save();
    })
    .then(result => Blog.findById(blogId))
    .then(blog => {
        blog.comments.pull(id);
        return blog.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Comment deleted successfully' });
    })    
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}