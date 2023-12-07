const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const passportLocal = require('passport-local')
const LocalStrategy = passportLocal.Strategy;
const flash = require('connect-flash');
const loginModel = require('./models/Login');

mongoose.connect(config.databaseURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
  secret: "Something",
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(loginModel.authenticate()));

passport.serializeUser(loginModel.serializeUser());
passport.deserializeUser(loginModel.deserializeUser());

passport.use(loginModel.createStrategy());



const myMiddleware = (req, res, next) => {
  next();
};

app.use(myMiddleware);

const homeRoute = require('./routes/index');
app.use('/', homeRoute);

const tournamentsRoutes = require('./routes/tournaments');
app.use('/tournaments', tournamentsRoutes);
const loginRoutes = require('./routes/logins');
app.use('/logins', loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
