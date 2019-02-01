const app = require('express')()
const cors = require('cors')
const isDeployed = require('./isDeployed')

app.set('trust proxy', 1)

if (!isDeployed())
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  )

module.exports = app
