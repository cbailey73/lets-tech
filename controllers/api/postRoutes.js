const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment, User } = require('../../models');

// Individual post route
router.get('/:postId', withAuth, async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByPk(postId, {
        include: [User, { model: Comment, include: User }],
      });
      res.render('post', { post });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred' });
    }
  });

router.post('/:postId/addComment', withAuth, async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.session.userId;
      const { commentContent } = req.body;
  
      await Comment.create({
        content: commentContent,
        postId,
        userId,
      });
  
      res.redirect(`/post/${postId}`);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred' });
    }
  });

module.exports = router;