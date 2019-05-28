const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
});

const User = mongoose.model('Users', UserSchema);;

module.exports = User; 
