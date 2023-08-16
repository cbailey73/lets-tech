const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment, User } = require('../../models');

// Route to create a new post
router.post('/discuss', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.create({ title, content });
        res.redirect('/discuss');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

// Route to create a new comment
router.post('/comment/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await Comment.create({ content, postId });
        res.redirect('/discuss');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

module.exports = router;