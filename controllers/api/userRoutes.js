const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Post login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    if (userData && validPassword) {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });

  } else {
      res.send('Invalid login credentials');
  }

  } catch (err) {
    res.status(400).json(err);
  }
});

// Post signup
router.post('/signup', async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  
  try {
      if (password !== repeatPassword) {
          res.send('Passwords do not match');
          return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = await User.create({ username, email, password: hashedPassword });
      
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json(userData);
      });

  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
  }
});

// Post logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;