const path = require('path');

module.exports = [
{
  entry: './src/home.js',
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname, 'public'),
  },
},
{
  entry: './src/entry.js',
  output: {
    filename: 'entry.js', 
    path: path.resolve(__dirname, 'public'),
  },
},
{
  entry: './src/homereact.js',
  output: {
    filename: 'homereact.js', 
    path: path.resolve(__dirname, 'public'),
  },
},
];