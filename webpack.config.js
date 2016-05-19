var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: './app.jsx',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
    publicPath: 'http://localhost:8080/build/'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};
