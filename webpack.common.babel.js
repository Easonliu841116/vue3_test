import path from 'path'
import fs from 'fs'
import WebpackBar from 'webpackbar'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { ENGINE, ENV, PUBLICPATH } from './config'
import imgpath from './src/js/hbsHelpers/imgpath'

const ViewSrc = path.resolve(__dirname, 'src/views/pages')

function pageWalker(pageDir) {
  return fs
    .readdirSync(pageDir)
    .filter((file) => fs.statSync(`${pageDir}/${file}`).isFile())
    .map((file) => file.replace(`.${ENGINE}`, ''))
}
function template(page) {
  return {
    template: `./views/pages/${page}.${ENGINE}`,
    filename: `${page}.html`,
    chunks: ['vendor', page]
  }
}

let entries = {}
pageWalker(ViewSrc).map((el) => {
  entries[el] = ['@babel/polyfill', `./js/${el}.js`]
})

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: entries,
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ENV === 'production' ? PUBLICPATH : '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: 10
        }
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunks: 'all',
      enforce: true,
    }),
    new WebpackBar({
      color: 'green',
      profile: true,
    }),
    ...pageWalker(ViewSrc).map(name => new HtmlWebpackPlugin(template(name))),
  ],
  module: {
    rules: [
      {
        test: /\.(handlebars|hbs)$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(__dirname, 'src/js/hbsHelpers'),
          partialDirs: [path.join(__dirname, 'src/views')],
          knownHelpers: [
            imgpath
          ]
        }
      },
      {
        test: /\.sass$/,
        use: () => {
          const loaders = ['css-loader', 'postcss-loader', 'sass-loader']
          return ENV === 'development'
            ? ['style-loader', ...loaders.map(el => el += '?sourceMap=true')]
            : ENV === 'development:css'
            ? [MiniCssExtractPlugin.loader, ...loaders.map(el => el += '?sourceMap=true')]
            : [MiniCssExtractPlugin.loader, ...loaders]
        }
      },
      {
        test: /\.css$/,
        use: () => 
          ENV === 'development' ? ['style-loader', 'css-loader?sourceMap=true'] : [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            },
          },
        ],
      },
    ],
  },
}

module.exports = webpackConfig
