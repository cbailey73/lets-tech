const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment, User } = require('../../models');

// Get individual post by ID
router.get('/:id', withAuth, async (req, res) => {
    try {
      const post_id = req.params.id;
      const post = await Post.findByPk(post_id, {
        include: [User, { model: Comment, include: User }],
      });
      res.render('post', { post });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred' });
    }
  });

// Create a new post
router.post('/', withAuth, async (req, res) => {
  const lastUpdated = new Date().toLocaleDateString();

  try {
    const newPost = await Post.create({
      ...req.body,
      lastUpdated,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
});

// Create a new comment by post ID
router.post('/:id/addComment', withAuth, async (req, res) => {
  const lastUpdated = new Date().toLocaleDateString();

    try {
      const post_id = req.params.id;
      const user_id = req.session.user_id;
      const { content } = req.body;
  
      await Comment.create({
        content,
        lastUpdated,
        post_id,
        user_id,
      });
  
      res.redirect(`/post/${postId}`);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred' });
    }
  });

router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          lastUpdated: req.body.lastUpdated
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // Ensure the user can only update their own posts
          },
        }
      );
  
      if (!updatedPost[0]) {
        res.status(404).json({ error: 'No post found with this ID or you are not authorized to update it.' });
        return;
      }

          res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the post.' });
  }
});

// DELETE a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the user can only delete their own posts
      },
    });

    if (!deletedPost) {
      res.status(404).json({ error: 'No post found with this ID or you are not authorized to delete it.' });
      return;
    }

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the post.' });
  }
});

module.exports = router;