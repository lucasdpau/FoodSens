// Load Express
const express = require('express');
const path = require('path');
// Create our express app
const app = express();

var mongoose = require('mongoose');
//manually fill this in every time you test, and remove before commits until you can figure out env variables
var mongoDB = '';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind,(console, 'MongoDB connection error:'));

// Configure the app (app.set)
// ejs is installed by npm. it is a view templating engine. we can only render from ejs and not html files for now.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)

// Define routes
app.get('/', (request, response) => {
    response.render("index");
});

// This will render the home.ejs template
app.get('/home', (req, res) => {
    res.render('home');
});

// Tell the app to listen on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});