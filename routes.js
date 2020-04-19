const express = require('express');
const router = express.Router();
var userCtrl = require('./models/users');

// Home page route
router.get('/', function (req, res) {
    res.render('index');
})

router.get('/hello', function (req, res) {
    res.send("<h1>Hello World!</h1>");
})

// renders home.ejs
router.get('/home', function (req, res) {
    res.render('home');
})

router.post('/home', function (req, res) {
    console.log(req.body.username);
    res.send("you did a POST");
})

router.get('/login', function (req, res) {
    res.render('login');
})

router.put('/login',);

router.get('/about', function (req, res) {
    res.render('about');
})

module.exports = router;