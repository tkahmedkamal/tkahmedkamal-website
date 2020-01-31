const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.[contenthash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      /* Babel Loader
      =======================================*/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      /* Css Loader
      =======================================*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      /* Sass Loader
      =======================================*/
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      /* Image Webpack Loader
      =======================================*/
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: "url-loader"
      },
      /* Font-awesome Loader
      =======================================*/
      {
        test: /font-awesome\.config\.js/,
        use: [{ loader: "style-loader" }, { loader: "font-awesome-loader" }]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
        loader: "url-loader"
      }
    ]
  },
  /* Optimization
  =======================================*/
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /node_modules/
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  /* DevServer
  =======================================*/
  devServer: {
    port: 8000,
    open: true,
    writeToDisk: true
  },
  plugins: [
    /* Html Webpack Plugin
    =======================================*/
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    /* Mini Css Extract Plugin
    =======================================*/
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css"
    }),
    /* Auto Prefixer
    =======================================*/
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    /* Jquery
    =======================================*/
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    /* Clean Web pack Plugin
    =======================================*/
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["!images/*", "!fonts/*"]
    }),
    /* Copy Plugin - Image
    =======================================*/
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "./src/images/"),
        to: path.resolve(__dirname, "./dist/images/")
      }
    ]),
    /* Copy Plugin - Fotns
    =======================================*/
    new CopyPlugin([
      {
        from: path.resolve(
          __dirname,
          "./node_modules/@fortawesome/fontawesome-free/webfonts/"
        ),
        to: path.resolve(__dirname, "./dist/webfonts/")
      }
    ])
  ]
};
