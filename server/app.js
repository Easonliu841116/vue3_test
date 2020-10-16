import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { SERVER } from '../config'

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', require('./routes/api'))

app.listen(SERVER)