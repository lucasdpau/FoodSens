//tests here
const express = require('express');
const path = require('path');
const router = require('./routes.js');

var mongoose = require('mongoose');

const mongo_atlas_url = process.env.MONGO_ATLAS
console.log("connecting to:" + mongo_atlas_url);
var mongoDB = mongo_atlas_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var testuser = require('./models/users');
test_user1 = testuser.create( { 
    username:'ass', 
    password:'abc', 
    number_of_events: 12, 
    email:"asdasd"
}, function (err, doc) {
    if (err) {
        console.error(err);
    }
     console.log(doc);
    });
console.log(test_user1);

test_delete_query = testuser.deleteOne( {user_name: 'ass' } , function (err) {
    if (err) {
        console.error(err);
    }
});
console.log(test_delete_query);
