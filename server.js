var http = require('http');  //imports the http module
var dt = require('./exportdate');

//The function passed into http.createServer will be executed when someone tries
//to access the computer at port 8080.
const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
  });

server.listen(8080, "127.0.0.1", () => {
  console.log('Server running at http://127.0.0.1:8080/');
});

// Use Express framework to make it easier! it will let us do routes, serve static files,
//handle different HTTP verbs (GET, POST, etc) without writing a ton of code ourselves!