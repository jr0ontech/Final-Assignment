const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    return res.render('tournaments', { tournaments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting tournaments.");
  }
});

router.get('/new', (req, res) => {
  res.render('add_tournament', { message: null });
});

router.post('/', async (req, res) => {
  try {
    const { title, description, date, type } = req.body;
    if (!title) {
      return res.status(400).render('add_tournament', {
        message: 'Title is required.',
        description,
        date,
        type
      });
    }

    const newTournament = new Tournament({ title, description, date, type });
    await newTournament.save();
    res.redirect('/tournaments');
  } catch (err) {
    console.error(err);
    res.status(500).render('add_tournament', {
      message: 'Error saving the tournament: ' + err.message,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      type: req.body.type
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Tournament.findByIdAndDelete(req.params.id);
    res.redirect('/tournaments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the tournament');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    res.render('edit_tournament', { tournament, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting tournament details for editing');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { title, description, date, type } = req.body;
    await Tournament.findByIdAndUpdate(req.params.id, { title, description, date, type });
    res.redirect('/tournaments');
  } catch (err) {
    console.error(err);
    res.status(500).render('edit_tournament', {
      message: 'Error updating the tournament: ' + err.message,
      title,
      description,
      date,
      type
    });
  }
});  

module.exports = router;