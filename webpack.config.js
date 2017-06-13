const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = JSON.parse(fs.readFileSync('package.json'));

module.exports = (env = {}) => {
  const port = env.port || process.env.PORT || 3000;

  return {
    devtool: 'source-map',
    entry: {
      app: [
        'normalize.css',
        `webpack-dev-server/client?http://0.0.0.0:${port}`,
        './src/app.css',
        './src/app.js',
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    devServer: {
      port,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: `http://localhost:${port}/`,
      stats: { colors: true },
      overlay: {
        errors: true,
      },
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        title: pkg.name,
        filename: 'index.html',
        chunks: ['app'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
