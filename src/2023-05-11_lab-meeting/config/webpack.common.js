// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const PrettierPlugin = require('prettier-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpack = require('webpack');

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve('@babel/preset-react')]
  }
};

module.exports = {
  // mode: "development",
  context: __dirname,
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve( __dirname, '../dist' ),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [babelLoader],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      // {
      //   test: /\.(s[ac]ss)$/i,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.(png|j?g|svg|gif|mp3)?$/,
        exclude: path.resolve(__dirname, '../src/assets/fonts/' ),
        use: [require.resolve('file-loader')]
      },
      {
        test: /\.(mp4|webm)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/video'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve(__dirname, '../src/assets/fonts/' ),
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'assets/fonts/',
        //       esModule: false
        //     }
        //   }
        // ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, '../public/index.html' ),
      title: "Lab Meeting: 2023-05-11"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
    // new PrettierPlugin()
  ],
  // resolve: {
    // modules: [path.resolve(__dirname, '../node_modules'),
    //   path.resolve(__dirname, '../src')],
    // alias: {
      // Add helper aliases needed when `yarn link spectacle` development
      // is enabled to avoid duplicate libs that require singletons.
      // react: require.resolve('react'),
      // 'react-dom': require.resolve('react-dom'),
      // 'spectacle': path.resolve(__dirname, '../node_modules/spectacle')
    // }
  // }
};
