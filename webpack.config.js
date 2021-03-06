const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
    entry:{
      main: ['@babel/polyfill', './index.js'],
    },
    output: {
        
        path: path.resolve(__dirname, 'dist'),
        filename:filename('js'),
    },
    resolve: {
      extensions: ['.js', '.json', '.png'],
      alias: {
        '@models': path.resolve(__dirname, 'src/models'),
        '@': path.resolve(__dirname, 'src'),
      }
    },
    optimization: optimization(),
    devServer: {
      port: 4200,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins:[
      new HTMLWebpackPlugin({
        template:'./index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css')
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: cssLoaders()
        },
        {
          test: /\.s[ac]ss$/,
          use: cssLoaders('sass-loader')
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader:{
            loader: 'babel-loader',
            options:{
              presets:[
                '@babel/preset-env'
              ],
              plugins:[
                '@babel/plugin-proposal-class-properties'
              ]
            }
          } 
        }
      ]
    }

}


