const path = require('path');
const webpack = require('webpack');

const APP_SOURCE = path.resolve(__dirname, 'app');
const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    APP_SOURCE+'/app.js'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'app.bundle.js',
    publicPath: '/assets/'
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }, {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      APP_SOURCE,
    ]
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
