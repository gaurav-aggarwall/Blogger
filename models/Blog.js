const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    author: {
        type: String,
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
    date: {
        type: Date,
        default: Date.now()
    }
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;