const router = require('express').Router();


// Blog Controller
const blogController = require('../controllers/blogs');



// Get all the blogs 
// ( /api/blog/ )
router.get('/', blogController.getAll);


// Get a particular blog 
// ( /api/blog/:id )
router.get('/:id', blogController.getSinglePost);


// Adding a new Blog  
// ( /api/blog/new )
router.post('/new', blogController.newBlog);


// Deleting a Blog  
// ( /api/blog/delete/:id )
router.delete('/delete/:id', blogController.deleteBlog);


module.exports = router;