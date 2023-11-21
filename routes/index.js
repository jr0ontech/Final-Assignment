const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.render('home');
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/tournaments', (req, res) => {
  res.render('tournaments');
});
module.exports = router;
