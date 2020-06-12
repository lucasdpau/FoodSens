// Load Express
const express = require('express');
const path = require('path');
const router = require('./routes.js');
const session = require("express-session");
const bcryptjs = require('bcryptjs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var userCtrl = require('./models/users');
// Create our express app
const app = express();

var mongoose = require('mongoose');

const mongo_atlas_url = process.env.MONGO_ATLAS
console.log("connecting to:" + mongo_atlas_url);
var mongoDB = mongo_atlas_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure the app (app.set)
// ejs is installed by npm. it is a view templating engine. we can only render from ejs and not html files for now.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)
// mounts the router defined in routes.js

// setup the passport
passport.use('local',
    new LocalStrategy((username, password, done) => {
        userCtrl.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcryptjs.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, {msg: "Incorrect password"})
            }
          })
      });
    })
  );
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userCtrl.findById(id, function(err, user) {
    done(err, user);
    });
});

  

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

// Tell the app to listen on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});