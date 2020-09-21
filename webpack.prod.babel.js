import { merge } from 'webpack-merge'
import os from 'os'
import { BundleAnalyzerPlugin }from 'webpack-bundle-analyzer'
import TerserJSPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

import webpackBaseConfig from './webpack.common.babel'
import { ENV } from './config'

const webpackConfig = {
  stats: 'minimal',
  devtool: 'eval',
  mode: 'production',
  plugins: [
    new TerserJSPlugin({
      parallel: os.cpus().length || 1,
      terserOptions: {
        drop_console: true
      },
    }),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static', to: 'static' }]
    }),
  ],
}

if(ENV === 'analyze') webpackConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = merge(webpackBaseConfig, webpackConfig)
