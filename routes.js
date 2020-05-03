const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var userCtrl = require('./models/users');

// Home page route
router.get('/', function (req, res) {
    var test_ejs = [ 
        { name: 'poops', age: '13'},
        { name: 'ass', age: '50' },
        { name: 'Jumanji', age: '12' },
        ];
        
    var tagline = "Let's test this!";

    var users = userCtrl.find(function (err, userlist) {
        if (err) return console.error(err);
        res.render('index', { 
        userlist: userlist, 
        test_ejs: test_ejs, 
        tagline: tagline,
        user: req.user
        });
    });
})

router.post('/', 
            passport.authenticate('local', {
                successRedirect: "/home",
                failureRedirect:"/",
                failureFlash: true
            })
            );

// misc 'easter egg' route, keep it here to demonstrate res.send
router.get('/hello', function (req, res) {
    res.send("<h1>Hello World!</h1>");
})

// renders home.ejs
router.get('/home', function (req, res) {
    res.render('home');
})
router.post('/home', function (req, res) {

    res.send("you did a POST");
})


router.get('/register', function (req, res) {
    res.render('register');
})
router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
//  TODO HASH the password
    bcryptjs.hash(password, 10, (err, hashedPassword) => {
        // if err, do something
        // otherwise, store hashedPassword in DB
    });

    // automatically updates the database with the new info
    new_user = userCtrl.create({username: username, password: password, email: email}, function (err, doc) { 
        console.log(doc);
    });
    res.redirect('/');
})

router.get('/entry/:entryId', function (req, res) {
	// req.params will show value of entryId
	var entry_id = req.params[entryID];
	res.send(req.params)
})

router.get('/logout', function (req, res) {
	// TODO logout
	res.redirect('/');
})

router.get('/about', function (req, res) {
    res.render('about');
})

module.exports = router;