const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs',
        required: true
    },
    body: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;