const WebSocket = require('ws')
const store = require('./store')()

function heartbeat () {
  this.isAlive = true
}

module.exports = (wss) => {
  wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }

  const {
    setUser,
    deleteUser,
    getDelta,
    getState,
    updateUser,
    patchState,
    send,
    initialRawState
  } = store

  wss.on('connection', function connection (ws, req) {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1]
    if (!token) return
    setUser(token)
    ws.on('close', function close () {
      deleteUser(token)
    })

    ws.isAlive = true
    ws.on('pong', heartbeat)

    let delta = getDelta(initialRawState, getState())
    send({ delta, client: ws })

    ws.on('message', function incoming (data) {
      let { raw, selection } = JSON.parse(data)
      updateUser(token, { selection })
      let delta = getDelta(getState(), raw)
      if (delta) {
        patchState(delta)
      }

      wss.clients.forEach(function each (client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          send({ client, delta })
        }
      })
    })
  })
}
