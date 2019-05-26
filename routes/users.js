const router = require('express').Router();
const bcrypt = require('bcryptjs');


// User Model
const User = require('../models/User');



// // Resgitering a new user 
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({ msg: 'Please enter all fields' });

    // Check for existing user
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({ name, email,password });

        bcrypt.hash(password, 10)
        .then(function(hash) {
            newUser.password = hash;

            newUser.save()
            .then(user => {
                req.session.userId = user._id;
                res.json({ 
                    msg: 'New User created', 
                    user: {
                        name: user.name,
                        email: user.email
                    }
                });
            });
        });
    });
});    



// Logging in a existing user 
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });

    var user;
    // Check for existing user
    User.findOne({ email: email })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exists' });
        
        if(bcrypt.compareSync(password, user.password)){
            req.session.userId = user._id;
            return res.status(200).json({ msg: 'Authentiation Succeeded'});
        } else {
            return res.status(400).json({ msg: 'Authentication failed, invalid username or password.' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: 'Authentication failed, invalid username or password.' });
    });
});



// Logout the user
router.get('/logout', function(req, res) {
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
});


module.exports = router;
