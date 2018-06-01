const http = require('http')
const WebSocket = require('ws');
const { EditorState, convertToRaw } = require('draft-js')
const { diff, patch } = require('jsondiffpatch')

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const createEmpty = () => {
  return convertToRaw(EditorState.createEmpty().getCurrentContent())
}

const colors = [
  '#ffcdd2',
  '#f8bbd0',
  '#e1bee7',
  '#d1c4e9',
  '#c5cae9',
  '#bbdefb',
  '#b3e5fc',
  '#b2ebf2',
  '#b2dfdb',
  '#c8e6c9'
]

const users = {}
const customStyleMap = {}

let state = createEmpty()
let initialState = createEmpty()

const send = ({ delta, client }) => {
  client.send(
    JSON.stringify({
      delta,
      users,
      customStyleMap
    })
  )
}

module.exports = (app) => {
  const server = http.createServer(app)
  const wss = new WebSocket.Server({ server })

  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  }

  const getDiff = raw => diff(state, raw)

  const applyDiff = diff => {
    state = patch(state, diff)
    return state
  }

  wss.on('connection', function connection(ws, req) {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1]
    if (!token) return
    if (!users[token]) {
      let color = colors[Math.floor(Math.random() * 10)]
      users[token] = {}
      customStyleMap[token] = {
        backgroundColor: color
      }
    }
    ws.on('close', function close() {
      console.log('disconnected')
      delete users[token]
      delete customStyleMap[token]
    })

    ws.isAlive = true;
    ws.on('pong', heartbeat)
    let delta = diff(initialState, state)
    send({ delta, client: ws })
    ws.on('message', function incoming(data) {
      let { raw, selection } = JSON.parse(data)      
      users[token].selection = selection
      let delta = getDiff(raw)
      if (!delta) return
      applyDiff(delta)
      
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          send({ client, delta })
        }
      })
    })
  })
  return server
}