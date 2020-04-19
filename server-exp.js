// Load Express
const express = require('express');
const path = require('path');
const router = require('./routes.js');
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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// Tell the app to listen on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});