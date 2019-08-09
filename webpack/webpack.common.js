const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../root'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: Path.resolve(__dirname, '../src/assets/fonts'),
      to: 'assets/fonts'
    }]),
    new CopyWebpackPlugin([{
      from: Path.resolve(__dirname, '../src/assets/icons'),
      to: 'assets/icons'
    }]),
    new CopyWebpackPlugin([{
      from: Path.resolve(__dirname, '../src/assets/images'),
      to: 'assets/images'
    }]),

    new HtmlWebpackPlugin({
      title: 'With Handlebars Template Engine',
      template: Path.resolve(__dirname, '../src/index.hbs'),
      minify: false
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/',
            context: "src"
          }
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  }
};