const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.render('home');
});
//About Page
router.get('/about', (req, res) => {
  res.render('about');
});
//Projects Page
router.get('/projects', (req, res) => {
  res.render('projects');
});
//Contact Page
router.get('/contact', (req, res) => {
  res.render('contact');
});
module.exports = router;
