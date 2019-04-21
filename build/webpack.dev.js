const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require("./webpack.common");

module.exports = merge(config, {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: "./dist",
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
});
