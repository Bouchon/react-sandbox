import express from 'express'
import { createServer } from 'http'
import logger from 'morgan'
import { json } from 'body-parser'
import 'colors'

import htmlServer from './features/renderer'
import apiServer from './features/api'
import webpackServer from './features/webpack'

const app = express()
const server = createServer(app)

// common
app.use(json())
app.use(logger('dev', { skip: (req) => req.url.includes('.hot-update.') }))
app.use(webpackServer)
app.use('/api/v1', apiServer)
app.use(htmlServer)

server.listen(process.env.PORT || 3000, () => {
    console.log(
        '⚡ Development server listening on'.green,
        `http://localhost:${server.address().port}`.yellow.underline,
        '\n'
    )
})