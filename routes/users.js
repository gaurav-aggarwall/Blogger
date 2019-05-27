const router = require('express').Router();


// Authentication Controller
const authController = require('../controllers/auth');



// Resgitering a new user 
// ( /api/user/register )
router.post('/register', authController.register);    


// Logging in a existing user 
// ( /api/user/login )
router.post('/login', authController.login);


// Logout the user 
// ( /api/user/logout )
router.get('/logout', authController.logout);


module.exports = router;
