const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');


module.exports = {
  entry: [ 'bootstrap-loader',  './src/app.js' ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(scss)$/,
      use: [
        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            path: path.resolve(__dirname, '/postcss.config.js'),
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        },
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'postcss-loader', 'css-loader']
    },
    {
      test: /\.styl$/,
      use: [
        'style',
        'css-loader',
        'stylus-loader'
      ]
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    },
    {
      test: /\.pug$/,
      use: [
        'pug-loader'
      ]
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        },
      ],
    },
    {
      test: /\.ico$|\.otf$|\.woff(2)?$|\.ttf$|\.wav$|\.mp3$|\.eot$/, // <-- retain original file name
      use: [
        'file-loader'
      ] 
    },
    {
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    },
    {
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My WebApp Example',
      filename: 'index.html',
      template: './src/index.pug',
      favicon: 'src/images/favicon.ico',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      inject: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Tether: "tether",
      "window.Tether": "tether",
      Popper: ['popper.js', 'default'],

    })
  ],
  resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    }
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};