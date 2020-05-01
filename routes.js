const express = require('express');
const router = express.Router();
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
        });
    });
})

router.post('/', function (req, res) {
    // TODO login here
    res.redirect('/home');
})

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
    var user_name = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
//  TODO HASH the password
// var hashed_pass = something

    // automatically updates the database with the new info
    new_user = userCtrl.create({user_name: user_name, password: password, email: email}, function (err, doc) { 
        console.log(doc);
    });
    console.log(new_user);
    res.redirect('/');
})

router.get('/entry/:entryId', function (req, res) {
	// req.params will show value of entryId
	var entry_id = req.params[entryID];
	res.send(req.params)
})

router.get('/about', function (req, res) {
    res.render('about');
})

module.exports = router;