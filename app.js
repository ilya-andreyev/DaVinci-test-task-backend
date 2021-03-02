require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes/routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

routes(app)

app.listen(PORT, () => {
  console.log('Server has been started...')
})
