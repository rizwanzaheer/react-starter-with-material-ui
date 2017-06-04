const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const cssDevConfig = ['style-loader', 'css-loader', 'sass-loader'];
const cssProductionConfig = ExtractTextPlugin.extract({
  use: ['style-loader', 'css-loader', 'sass-loader'],
  publicPath: '/dist',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      general: path.resolve('src/general'),
      layouts: path.resolve('src/layouts'),
      routes: path.resolve('src/routes'),
      styles: path.resolve('src/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: isProduction ? cssProductionConfig : cssDevConfig,
      },
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    hot: true,
    open: false,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Main Editor',
      minify: {
        collapseWhitespace: isProduction,
      },
      hash: false,
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !isProduction,
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
