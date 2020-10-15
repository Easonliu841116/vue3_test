import { merge } from 'webpack-merge'
import os from 'os'
import chalk from 'chalk'
import { BundleAnalyzerPlugin }from 'webpack-bundle-analyzer'
import TerserJSPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

import webpackBaseConfig from './webpack.common.babel'
import { NODE_ENV, PROD_ENV, PUBLICPATH, PRETTIFY } from './config'
import CompressionPlugin from 'compression-webpack-plugin'

function messagePrefix() {
  return chalk.bgBlue.black(' I ')
}

const webpackConfig = {
  stats: 'errors-only',
  devtool: 'eval',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static', to: 'static' }]
    })
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: os.cpus().length || 1,
        terserOptions: {
          drop_console: true
        },
      })
    ]
  },
}

if(PROD_ENV === 'analyze') {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (PRETTIFY !== 'prettify') {
  webpackConfig.plugins.push(
    new OptimizeCssAssetsWebpackPlugin()
  )
}

if(PROD_ENV === 'deploy') {
  webpackConfig.plugins.push(
  new CompressionPlugin({
    filename: '[path][base].gz',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 1024,
    minRatio: 0.8,
  }),
  new CompressionPlugin({
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 1024,
    minRatio: 0.8,
  }),)
}

console.log(
  `${messagePrefix()} output path: ${chalk.greenBright(PUBLICPATH)}`, '\n',
  `${messagePrefix()} prettify: ${PRETTIFY ? chalk.blueBright(PRETTIFY) : chalk.blueBright('default')}`, '\n',
  `${messagePrefix()} project mode: ${chalk.yellowBright(NODE_ENV)}` , '\n',
  `${messagePrefix()} production mode: ${PROD_ENV ? chalk.yellowBright(PROD_ENV) : chalk.yellowBright('default')}`
)

export default merge(webpackBaseConfig, webpackConfig)
