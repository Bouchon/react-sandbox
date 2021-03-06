const fs = require('fs')
const path = require('path')

exports.getAdjustedBabelOptions = function getAdjustedBabelOptions () {
    const babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc')))
    babelConfig.presets.forEach(function (preset) {
        if (preset instanceof Array && preset[0] === 'env') {
            preset[1].modules = false
        }
    })
    babelConfig.cacheDirectory = path.join(
        __dirname, 'node_modules', '.cache', 'babel-loader',
        process.env.NODE_ENV || 'development'
    )
    return babelConfig
}