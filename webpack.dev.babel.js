import { merge } from 'webpack-merge'
import path from 'path'
import chalk from 'chalk'

import webpackBaseConfig from './webpack.common.babel'
import { PORT } from './config'

const webpackConfig = {
  stats: 'errors-only',
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    hot: true,
    compress: false,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, 'src'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: PORT,
    onListening: () => {
      console.log(chalk.white.bgGreen('startAt: '), `http://localhost:${PORT}`);
    }
  },
}

module.exports = merge(webpackBaseConfig, webpackConfig)
