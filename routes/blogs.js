const router = require('express').Router();


// Auth MiddleWare
const authMiddleware = require('../middleware/auth');


// Blog Controller
const blogController = require('../controllers/blogs');



// Get all the blogs 
// ( /api/blog/ )
router.get('/', authMiddleware, blogController.getAll);


// Get a particular blog 
// ( /api/blog/:id )
router.get('/:id', authMiddleware, blogController.getSinglePost);


// Adding a new Blog  
// ( /api/blog/new )
router.post('/new', authMiddleware, blogController.newBlog);


// Editing a particular Blog  
// ( /api/blog/edit/:id )
router.put('/edit/:id', authMiddleware, blogController.editBlog);


// Deleting a Blog  
// ( /api/blog/delete/:id )
router.delete('/delete/:id', authMiddleware, blogController.deleteBlog);


module.exports = router;