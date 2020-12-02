import { merge } from 'webpack-merge'
import path from 'path'
import chalk from 'chalk'
import portfinder from 'portfinder'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import ip from 'ip'

import webpackBaseConfig from './webpack.common.babel'
import { PORT, SERVER, NODE_ENV } from './config'

const webpackConfig = {
  stats: 'errors-only',
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [],
  devServer: {
    hot: true,
    compress: false,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, 'src'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: PORT || process.env.PORT
  },
}

export default new Promise((res, rej) => {
	portfinder.basePort = process.env.PORT || PORT
	portfinder.getPort((err, port) => {
		if (err) {
			rej(err)
		} else {
			process.env.PORT = port
      webpackConfig.devServer.port = port
      webpackConfig.plugins.push(
				new FriendlyErrorsPlugin({
					compilationSuccessInfo: {
						messages: [
              `project start at: ${chalk.greenBright(`http://localhost:${port}/`)} || ${chalk.greenBright(`http://${ip.address()}:${port}/`)}`,
              `server running at ${chalk.blueBright(`http://localhost:${SERVER}/`)}`,
              `project mode: ${chalk.yellowBright(NODE_ENV)}`,
						],
					}
				}),
			);
			res(merge(webpackBaseConfig, webpackConfig))
		}
	})
})
