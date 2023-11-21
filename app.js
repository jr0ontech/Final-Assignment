const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect(config.databaseURL,);
app.use(bodyParser.urlencoded({ extended: true }));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const myMiddleware = (req, res, next) => {
  console.log('Middleware executed');
  next();
};

router.use(myMiddleware);

const homeRoute = require('./routes/index');
app.use('/', homeRoute);

const tournamentsRoutes = require('./routes/tournaments');
app.use('/tournaments', tournamentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
