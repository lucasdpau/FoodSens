// Load Express
const express = require('express');
const path = require('path');
const router = require('./routes.js');
// Create our express app
const app = express();

// Configure the app (app.set)
// ejs is installed by npm. it is a view templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)
// mounts the router defined in routes.js
app.use('/', router);

// Tell the app to listen on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});