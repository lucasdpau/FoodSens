// Load Express
const express = require('express');
const path = require('path');
// Create our express app
const app = express();

// Configure the app (app.set)
// ejs is installed by npm. it is a view templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)

// Define routes
app.get('/', (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

// This will render the home.ejs template
app.get('/home', (req, res) => {
    res.render('home');
});

// Tell the app to listen on port 8080
app.listen(3000, () => {
    console.log('Listening on port 3000');
});