const express = require('express');
const passport = require('passport');
const router = express.Router();
const Login = require('../models/Login');
const emailValidator = require('email-validator');

router.get('/login', (req, res) => {
  res.render('authentication/loginpage', { message: req.flash('error'), user: req.user });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.redirect('/logins/login');
    }
    console.log('Authentication successful. User:', user);
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error logging out.");
    }
    res.redirect('/');
  });
});

router.get('/new', (req, res) => {
  res.render('authentication/add_login', { message: null });
});

router.post('/', async (req, res) => {
  try {
    const { username, password, email, created } = req.body;

    // Validate email format using the email-validator package
    const isEmailValid = emailValidator.validate(email);

    if (!isEmailValid) {
      return res.status(400).render('authentication/add_login', {
        message: 'Invalid email address.',
        username,
        password,
        email,
      });
    }

    if (!email || !password) {
      return res.status(400).render('authentication/add_login', {
        message: 'Email and password are required.',
        password,
        email,
      });
    }

    await Login.register({ username, email, created }, password);

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });

  } catch (err) {
    console.error(err);
    res.status(500).render('authentication/add_login', {
      message: 'Error saving the login: ' + err.message,
      username: req.body.username,
      password: req.body.password,
      user: req.user,
    });
  }
});

module.exports = router;
