// Load Express
const express = require('express');
// Create our express app
const app = express();

// Configure the app (app.set)

// Mount middleware (app.use)

// Define routes
app.get('/', (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

// Tell the app to listen on port 8080
app.listen(3000, () => {
    console.log('Listening on port 3000');
});