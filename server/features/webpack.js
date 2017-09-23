import express from 'express'
import DashboardPlugin from 'webpack-dashboard/plugin'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import { join } from 'path'
import webpack from 'webpack'

const configFile = join(__dirname, '../../webpack.config.js')
const config = require(configFile)
const compiler = webpack(config)
compiler.apply(new DashboardPlugin())

export const STATIC_PATH = join(__dirname, '../../static')
const webpackRouter = new express.Router()
console.log('PUBLIC PATH = ' + config.output.publicPath)
webpackRouter.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    contentBase: STATIC_PATH
}))
webpackRouter.use(hotMiddleware(compiler))

console.log('⚡️  Webpack dev/hot server configured.  Bundle building…'.green)

export default webpackRouter