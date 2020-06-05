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

// misc 'easter egg' route, to demonstrate res.send
router.get('/hello', function (req, res) {
    res.send("<h1>Hello World!</h1>");
})


router.get('/home', function (req, res) {
// TODO: at first just send the events/food lists of the current month. then send other months only if requested
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
		eventsJSONStr = JSON.stringify(eventlist);
                res.render('home', { 
                    user:req.user, 
                    eventlist: eventlist, 
                    eventsJSONStr: eventsJSONStr,
                    foodlist: foodlist, 
                    currentTime: currentTime,
                    currentYear: currentYear,
                    currentMonth: currentMonth
                });
            })
        })
    }
    else {
        console.log('No user logged in. Redirecting to login')
        res.redirect('/');
    }
})
router.post('/home', function (req, res) {
    res.send("you did a POST");
})


router.get('/getevents', function (req, res) {
    if (req.user) {
        eventCtrl.find( {'user': req.user._id }, function (err, eventlist) {
            if (err) {
                return console.error(err);
            }
	    eventsJSONStr = JSON.stringify(eventlist);
	    eventsJSON = [];
	    eventlist.forEach(function(item) {
	    // dates in DB are saved as utc, so fullcalendar will adjust is and the event will be on the wrong date
		var formatted_date = new Date(item.event_date);
		formatted_date.setDate(formatted_date.getUTCDate());
		new_event_item = {};
		new_event_item['allDay'] = "";
		new_event_item['title'] = item.event_type;
		new_event_item['id'] = item._id;
		new_event_item['end'] = formatted_date;
		new_event_item['start'] = formatted_date;
		eventsJSON.push(new_event_item);
	    });
	    res_json = JSON.parse(JSON.stringify(eventsJSON));
            res.send(res_json);
        })
    }
    else {
        console.log('No user logged in. Redirecting to login');
        res.redirect('/');
    }
})
router.get('/getfoods', function (req, res) {
    if (req.user) {
        foodCtrl.find( {'user': req.user._id }, function (err, foodlist) {
            if (err) {
                return console.error(err);
            }
	    foodJSONStr = JSON.stringify(foodlist);
	    foodJSON = [];
	    foodlist.forEach(function(item) {
	    // dates in DB are saved as utc, so fullcalendar will adjust is and the event will be on the wrong date
		var formatted_date = new Date(item.datetime_eaten);
		formatted_date.setDate(formatted_date.getUTCDate());
		new_food_item = {};
		new_food_item['allDay'] = "";
		new_food_item['title'] = item.food_name;
		new_food_item['id'] = item._id;
		new_food_item['end'] = formatted_date;
		new_food_item['start'] = formatted_date;
		foodJSON.push(new_food_item);
	    });
	    res_json = JSON.parse(JSON.stringify(foodJSON));
            res.send(res_json);
        })
    }
    else {
        console.log('No user logged in. Redirecting to login');
        res.redirect('/');
    }

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
    var default_date = req.query.date;
    console.log('default date is: ' + default_date);
    res.render('new_entry', {default_date: default_date, });
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


router.get("/new_food", function (req, res) {
    var default_date = req.query.date;
    console.log('default date is: ' + default_date);
    res.render("new_food", {default_date: default_date, });
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
    // we need to be logged in to use settings
    if (req.user) {
        res.render('settings');
    }
    else {
        console.log('No user logged in. Redirecting to login');
        res.redirect('/');
    }
})
router.post('/settings', function (req, res) {
    if (req.user) {
        var dayslookingback = req.body.dayslookingback;
        res.redirect('/settings');
    }
    else {
        console.log('No user logged in. Redirecting to login');
        res.redirect('/');    
    }
})


router.get('/about', function (req, res) {
    res.render('about');
})


router.get('/entry/:entryId', function (req, res) {
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


router.get('/food/:foodId', function (req, res) {
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


router.get('/analysis', function (req, res) {
// pseudocode: get userDoc from the db, then eventdoc from the dbm then run analyze function on all the events
// append the result of the analysis to results list and return that.

    if (req.user) {
        resultsList = []
        async function analyze() {
            var userObj = await userCtrl.findById(req.user._id);
            var eventDoc = await eventCtrl.find({'user': req.user._id});
            var foodDoc = await foodCtrl.find({'user': req.user._id});
            const daysToLookBack = userObj['settings']['daysLookingBack'];
            console.log("days to look back = " + daysToLookBack);
            eventDoc.forEach(function(doc){
                resultsList.push(entryAnalyze(doc, foodDoc, daysToLookBack, req.user._id));
            })
            console.log(resultsList);
            res.send(resultsList);
        }
        analyze();
    }

    else {
        console.log('not logged in, redirecting to front page');
        res.redirect('/');
    }
})
// pseudocode for analysis
// function takes params of entryid, req, and how many days to look back
// get the entry/event id, and get that object from the db
// get "days to look back" and get all food entries within that range
// look at the food/tags and add a point to each one
// 

const entryAnalyze = function (eventObj, foodDoc, daysToLookBack, userId) {
    const eventName = eventObj.event_type;
    var resultsObj = {"event_name": eventName, "food_scores": {}, "date":eventObj.event_date,};
// to reduce DB calls, we just get the entire foodQuerySet once, and filter with daysToLookBack
    var earliestDay = eventObj.event_date;
    // we add 1 to daystolookback for rounding error
    earliestDay.setDate(earliestDay.getDate() - (daysToLookBack + 1));
    foodDoc.forEach(function(doc){
        console.log(doc);
        if (resultsObj["food_scores"][doc.description]) {
            resultsObj["food_scores"][doc.description] += 1;
        } else {
            resultsObj["food_scores"][doc.description] = 1;
        }
    })
    return resultsObj;
}

module.exports = router;