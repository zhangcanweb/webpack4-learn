const merge = require("webpack-merge");
const path = require('path')
const config = require("./webpack.common");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(config, {
  mode: "production",
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, './style')
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:5].css',
      chunkFilename: '[id]-[contenthash:5].css'
    }),
    new OptimizeCssAssetsPlugin({})
  ]
});
