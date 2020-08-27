var  React = require('react');
var  ReactDOM = require('react-dom');

const Ele = React.createElement;

const element = Ele('div',null, 'Hello World!');
ReactDOM.render(element, document.getElementById('test'));
