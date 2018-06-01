const express = require('express')
const Bundler = require('parcel-bundler')
const createServer = require('./createServer')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 1234
// const bundler = new Bundler('app/index.html')

app.use(require('cookie-parser')())
app.use(express.static('dist'))

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
// app.use(bundler.middleware())

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
