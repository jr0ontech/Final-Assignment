const express = require('express');
const router = express.Router();
const Login = require('../models/Login'); 

router.get('/', async (req, res) => {
  try {
    const logins = await Login.find();
    return res.render('home', { logins });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting logins.");
  }
});

router.get('/new', (req, res) => {
  res.render('add_login', { message: null });
});

router.post('/', async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password) {
      return res.status(400).render('add_login', {
        message: 'User and password are required.',
        user,
        password
      });
    }

    const newLogin = new Login({ user, password });
    await newLogin.save();
    res.redirect('/logins');
  } catch (err) {
    console.error(err);
    res.status(500).render('add_login', {
      message: 'Error saving the login: ' + err.message,
      user: req.body.user,
      password: req.body.password
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Login.findByIdAndDelete(req.params.id);
    res.redirect('/logins');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the login');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const login = await Login.findById(req.params.id);
    res.render('edit_login', { login, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting login details for editing');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { user, password } = req.body;
    await Login.findByIdAndUpdate(req.params.id, { user, password });
    res.redirect('/logins');
  } catch (err) {
    console.error(err);
    res.status(500).render('edit_login', {
      message: 'Error updating the login: ' + err.message,
      user,
      password
    });
  }
});

module.exports = router;
