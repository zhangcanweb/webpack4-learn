const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: '[name]-[hash:5].js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.less', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              outputPath: './imgs',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new AddAssetHtmlPlugin({ 
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js') 
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/vendors.dll.json')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'verdor.js'
        },
        default: {
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          // name: 'common.js'
        }
      }
    }
  }
};
