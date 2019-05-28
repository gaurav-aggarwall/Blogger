const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    }
}, { timestamps: true });

const Blog = mongoose.model('Blogs', BlogSchema);

module.exports = Blog;