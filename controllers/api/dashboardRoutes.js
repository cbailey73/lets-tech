const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment } = require('../../models');

router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.destroy({ where: { id: postId } });
        res.status(200);
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

router.delete('/comment/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.destroy({ where: { id: commentId } });
        res.status(200);
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

module.exports = router;