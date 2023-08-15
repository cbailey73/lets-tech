const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Fetch posts for the homepage
router.get('/homepage', async (req, res) => {
  try {
      const postData = await Post.findAll({ include: Comment }); // Include comments
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts
      });
  } catch (err) {
      res.status(500).json({ message: 'An error has occurred' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
