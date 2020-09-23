import { merge } from 'webpack-merge'
import os from 'os'
import { BundleAnalyzerPlugin }from 'webpack-bundle-analyzer'
import TerserJSPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

import webpackBaseConfig from './webpack.common.babel'
import { ENV } from './config'
import CompressionPlugin from 'compression-webpack-plugin'


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
    }),
  ],
}

if(ENV === 'analyze') webpackConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = merge(webpackBaseConfig, webpackConfig)
