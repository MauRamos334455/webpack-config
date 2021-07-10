const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebPlugin = require("copy-webpack-plugin");


module.exports = {

  mode: 'development',
  output: {
    //Vuelve a crear directorios
    clean: true
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
      }
    ]
  },
  plugins: [

    new HtmlWebPackPlugin({
      title:    'Mi Webpack App',
      template: './src/index.html',
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
      filename:'[name].css',
      ignoreOrder: false
    }),

    new CopyWebPlugin({
      patterns: [
        { from : 'src/assets/', to:'assets/'}
      ]
    }),
  ],
}