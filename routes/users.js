const router = require('express').Router();


// Authentication Controller
const userController = require('../controllers/user');



// Resgitering a new user 
// ( /api/user/register )
router.post('/register', userController.register);    


// Logging in a existing user 
// ( /api/user/login )
router.post('/login', userController.login);


// Logout the user 
// ( /api/user/logout )
router.get('/logout', userController.logout);


module.exports = router;
