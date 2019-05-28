const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');


//  Register a new User
exports.register = (req, res, next) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    }  

    // Check for existing user
    User.findOne({ email })
    .then(user => {
        if(user){
            const error = new Error('This email is already been registered');
            error.statusCode = 409;
            next(error);
        } 
        
        bcrypt.hash(password, 12)
        .then(password => {
            const newUser = new User({ name, email, password });
            return newUser.save();
        })
        .then(result => {
            const token = jwt.sign({
                email: result.email,
                userId: result._id.toString()
            }, 
            require('../config/keys').jwtSecret,
            { expiresIn: '1h' }
        );

            res.status(201).json({
                message: 'User was registered successfully',
                token: token,
                userId: result._id.toString()
            });
        })    
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });          
    }); 
}


//  Login User
exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;

    if(!email || !password){
        const error = new Error('Please enter all fields');
        error.statusCode = 422;
        throw error;
    } 

    // Check for existing user
    User.findOne({ email: email })
    .then(user => {
        if(!user){
            const error = new Error('User does not exist');
            error.statusCode = 401;
            throw error;
        }

        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(result => {
        if(!result){
            const error = new Error('Authentication failed');
            error.statusCode = 401;
            throw error;    
        }

        const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 
            require('../config/keys').jwtSecret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            message: 'Authentiation Succeeded',
            token: token,
            userId: loadedUser._id.toString()
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }); 
}


// Logout User
exports.logout = function(req, res) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return res.status(500).json({msg: "Please try again"});
            } else {
                res.clearCookie('session');
                return res.redirect('/');
            }
        });
    }
}