const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get route for the homepage to display all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['lastUpdated', 'DESC']],
    });

    if (!postData) {
      alert('There are no posts yet. Please create the first!');
      res.redirect('/dashboard');
    }

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
});

// Get individual post by ID
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const post_id = req.params.id;
    const postData = await Post.findByPk(post_id, {
      include: [User, { model: Comment, include: User }],
    });

    const post = postData.get({plain:true});

    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
});

// GET comments for a specific post by post's ID
router.get('/post/:id/comments', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['lastUpdated', 'DESC']],
    });

    const comments = commentsData.map((comment) => comment.get({ plain: true }));

    res.render('comments', { comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve comments.' });
  }
});

// Edit a specific post by post's ID
router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the user can only update their own posts
      },
    });

    const post = postData.get({ plain: true })

    res.render('edit', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
});

// Redirect user away from login page if they're logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Get User Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userPosts = await Post.findAll({ 
      where: { user_id: userId }, 
      include: User,
      order: [['lastUpdated', 'DESC']],
    });
    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      posts,
      logged_in: req.session.logged_in
     });
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
});

module.exports = router;
