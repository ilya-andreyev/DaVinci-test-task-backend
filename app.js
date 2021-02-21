require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes/routes')

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

routes(app)

app.listen(port)
