const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
}, { timestamps: true });

const Blog = mongoose.model('Blogs', BlogSchema);

module.exports = Blog;