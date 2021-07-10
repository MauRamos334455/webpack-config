const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

  mode: 'production',
  output: {
    //Vuelve a crear directorios
    clean: true,
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test:   /\.html$/i,
        loader: 'html-loader',
        options: {
          sources:  false,
          minimize: false,
        },
      },
      {
        test:    /\.css$/i,
        exclude: /styles.css$/,
        use:     ['style-loader', 'css-loader']
      },
      {
        test: /styles.css$/,
        use:  [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test:   /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
  },
  plugins: [

    new HtmlWebPackPlugin({
      title:    'Mi Webpack App',
      template: './src/index.html',
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
      filename:'[name].[fullhash].css',
      ignoreOrder: false
    }),

    new CopyWebPlugin({
      patterns: [
        { from : 'src/assets/', to:'assets/'}
      ]
    }),
  ],
}