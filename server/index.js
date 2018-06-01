const express = require('express')
const createServer = require('./createServer')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 1234

app.use(require('cookie-parser')())

if (process.env.NODE_ENV !== 'production') {
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler('app/index.html')
  app.use(bundler.middleware())
} else {
  app.use(express.static('dist'))
}

const genID = () => Math.random().toString(36).substr(2, 9)

app.use((req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    res.cookie(
      'token',
      genID(),
      { maxAge: 1000 * 60 * 60 * 24, httpOnly: false },
    )
  }
  next()
})

app.use(bodyParser.json())

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
