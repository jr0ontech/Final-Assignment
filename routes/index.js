const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('home');
});
router.get('/news', (req, res) => {
  res.render('news');
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/contact', (req, res) => {
  res.render('contact');
});
router.get('/loginpage', (req, res) => {
  res.render('loginpage');
});
module.exports = router;