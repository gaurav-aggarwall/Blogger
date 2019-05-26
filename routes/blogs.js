const router = require('express').Router();

// Blog Model
const Blog = require('../models/Blog');


// Get - All the blogs
router.get('/', (req,res) => {
    Blog.find()
        .sort({ date: -1 })
        .then(blogs => res.json(blogs))
        .catch(err => console.log(err));
});


// Post - New blog
router.post('/new', (req,res) => {
    const { author, title, body } = req.body;

    if(!author || !title || !body) return res.status(400).json({ msg: 'Please enter all fields' });

    const newBlog = new Blog({ author, title, body });

    newBlog.save()
        .then(blog => res.json(blog))
        .catch(err => console.log(err));
});


// Delete - A blog with id
router.delete('/delete/:id', (req,res) => {
    const id = req.params.id;

    if(!id) return res.status(400).json({ msg: 'Please select a particular blog to delete' });

    Blog.findById(id)
        .then(blog => {
            blog.remove()
                .then( blog => {
                    res.json({msg: 'Deleted', blog});
                }).catch(err => res.status(40).json({ msg: 'Blog Not Found' }));
        }).catch(err => res.status(404).json({ msg: 'Blog Not Found' }));
});

module.exports = router;