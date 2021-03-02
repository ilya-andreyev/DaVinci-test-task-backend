require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes/routes')

const app = express()
const port = 3001

app.use(cors())

routes(app)

app.listen(port)
