import React from 'react';
import ReactDOM from "react-dom";

const Ele = React.createElement;

const element = Ele('div',null, 'Hello World!');
ReactDOM.render(element, document.getElementById('test'));
console.log("react is working!");