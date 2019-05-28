const router = require('express').Router();

// Blog Controller
const blogController = require('../controllers/blog');



// Get all the blogs 
router.get('/', blogController.getAll);

module.exports = router;
