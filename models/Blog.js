const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: Object,
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