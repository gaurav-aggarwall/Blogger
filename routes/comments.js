const router = require('express').Router();


// Auth MiddleWare
const authMiddleware = require('../middleware/auth');


// Blog Controller
const commentController = require('../controllers/comment');


// Adding a new Comment  
// ( /api/comment/new/:id )
router.post('/new/:id', authMiddleware, commentController.newComment);


// Editing a particular Blog  
// ( /api/comment/edit/:id )
router.put('/edit/:id', authMiddleware, commentController.editComment);


// Deleting a Blog  
// ( /api/comment/delete/:id )
router.delete('/delete/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
