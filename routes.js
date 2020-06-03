const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var userCtrl = require('./models/users');
var eventCtrl = require('./models/events');
var foodCtrl = require('./models/food');

// Home page route
router.get('/', function (req, res) {
    var test_ejs = [ 
        { name: 'poops', age: '13'},
        { name: 'ass', age: '50' },
        { name: 'Jumanji', age: '12' },
        ];
    var tagline = "Let's test this!";
    userCtrl.find(function (err, userlist) {
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
    currentDate = new Date;
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    currentTime = Date.now();
    if (req.user) {
        console.log('logged in user _id is' + req.user._id)
        eventCtrl.find( {'user': req.user._id }, function (err, eventlist) {
            if (err) {
                return console.error(err);
            }
            foodCtrl.find( {'user': req.user._id }, function (err, foodlist) {
                if (err) {
                    return console.error(err);
                }
                console.log(currentTime);
                res.render('home', { 
                    user:req.user, 
                    eventlist: eventlist, 
                    foodlist: foodlist, 
                    currentTime: currentTime,
                    currentYear: currentYear,
                    currentMonth: currentMonth
                });
            })
        })
    }
    else {
        console.log('no user logged in.')
        res.render('home', { user: null, currentTime: currentTime });
    }
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
    bcryptjs.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return console.error(err);
        }
        userCtrl.create({username: username, password: hashedPassword, email: email}, function (err, doc) { 
            console.log(doc);
        });
    });

    // automatically updates the database with the new info
    res.redirect('/');
})

router.get('/new_entry', function (req, res) {
    console.log('logged in user _id is' + req.user._id)
    res.render('new_entry');
})
router.post('/new_entry', function (req, res) {
    // add a new event specific to the user. increment event counter by one
    var event_type = req.body.event_type;
    var event_date = req.body.event_date;
    var event_severity = req.body.event_severity;
    var description = req.body.description;
    var tags = req.body.tags.split(',')
    eventCtrl.create( { event_type: event_type, 
                        event_date: event_date, 
                        event_severity: event_severity, 
                        description: description, 
                        tags: tags,
                        user: req.user._id,
                        } );
    userCtrl.findById(req.user._id, function (err, doc) {
        if (err) {
            console.error(err);
        }
        console.log(doc.number_of_events);
        doc.number_of_events += 1;
        console.log(doc.number_of_events);
        doc.save();
    });
    res.redirect('/home');
})

router.post("/new_food", function (req, res) {
    // new food entries
    var food = req.body.food;
    var food_date = req.body.date;
    var description = req.body.description;
    var tags = req.body.tags.split(',');
    foodCtrl.create( {
        food_name: food,
        datetime_eaten: food_date,
        description: description,
        tags: tags,
        user: req.user._id,
    });
    userCtrl.findById(req.user._id, function (err, doc) {
        if (err) {
            console.error(err);
        }
        console.log(doc.meals_eaten);
        doc.number_of_events += 1;
        console.log(doc.meals_eaten);
        doc.save();
    });
    res.redirect('/home');
})


router.get('/logout', function (req, res) {
	req.logOut();
	res.redirect('/');
})

router.get('/settings', function (req, res) {
    res.send('Hi');
})

router.get('/about', function (req, res) {
    res.render('about');
})



router.get('/entry/:entryId', function (req, res) {
	// req.params will show value of entryId
	var entryId = req.params[entryId];
	res.send(req.params)
})

router.get('/ajax/entry/:entryId', function (req, res) {
    var entryId = req.params.entryId;
    // need to convert the string into an object id for mongoose
    var objEntryId = mongoose.Types.ObjectId(entryId);
    if (req.user) {
        var userId = req.user._id;
	    eventCtrl.findById(objEntryId, function (err, doc) {
            if (err) {
                console.error(err);
            }
            if (String(doc.user) == String(userId)) {
                res.send(doc);	
            }
            else {
                res.send('error: wrong user');
            }
	    });
    }
    else {
        res.send('error: please login');
    }
})
router.get('/ajax/food/:foodId', function (req, res) {
    var foodId = req.params.foodId;
    // need to convert the string into an object id for mongoose
    var objfoodId = mongoose.Types.ObjectId(foodId);
    if (req.user) {
        var userId = req.user._id;
	    foodCtrl.findById(objfoodId, function (err, doc) {
            if (err) {
                console.error(err);
            }
            if (String(doc.user) == String(userId)) {
                res.send(doc);	
            }
            else {
                res.send('error: wrong user');
            }
	    });
    }
    else {
        res.send('error: please login');
    }
})


module.exports = router;