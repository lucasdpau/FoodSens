const path = require('path');

module.exports = [
{
  entry: './src/index.js',
  output: {
    filename: 'main.js',
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
];