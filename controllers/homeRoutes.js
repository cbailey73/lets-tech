const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Fetch posts for the homepage
router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({ include: [
        {model: User}
      ] 
    });

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

// Route to display all posts and comments
// router.get('/discuss', withAuth, async (req, res) => {
//   try {
//       const postData = await Post.findAll({ include: [
//           {model: Comment},
//           {model: User}
//       ] 
//       }); // Include comments
//       const posts = postData.map((post) => post.get({ plain: true }));
      
//       res.render('discuss', {
//         posts,
//         logged_in: req.session.logged_in,
//       });
//   } catch (err) {
//       res.status(500).json({ message: 'An error has occurred' });
//   }
// });

// Get User Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const userPosts = await Post.findAll({ where: { userId }, include: User });
    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      posts,
      logged_in: req.session.logged_in
     });
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
});
////

////

// Post login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//       const user = await User.findOne({ where: { username } });
//       if (user && await bcrypt.compare(password, user.password)) {
//           // Successful login
//           req.session.logged_in = true;
//           res.send('Login successful');
//       } else {
//           res.send('Invalid login credentials');
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('An error occurred');
//   }
// });


module.exports = router;
