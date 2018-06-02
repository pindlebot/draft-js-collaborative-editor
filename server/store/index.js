const createEmpty = require('./createEmpty')
const uuid = require('uuid/v4')
const jsondiffpatch = require('jsondiffpatch')

const j = jsondiffpatch.create({
  objectHash (obj, index) {
    return obj.key || '$$index:' + index
  }
})

const colors = [
  '#bbdefb',
  '#ffcdd2',
  '#c8e6c9',
  '#f8bbd0',
  '#b2dfdb',
  '#e1bee7',
  '#b2ebf2',
  '#d1c4e9',
  '#b3e5fc',
  '#c5cae9'
]

module.exports = () => {
  let availableColors = [...colors]
  const users = {}
  const customStyleMap = {}

  let rawState = createEmpty()
  let initialRawState = jsondiffpatch.clone(rawState)

  const getState = () => rawState

  const patchState = (diff) => {
    rawState = j.patch(rawState, diff)
  }

  const setUser = id => {
    if (users[id]) return
    let color = colors[Math.floor(Math.random() * 10)]
    users[id] = {
      id: id
    }
    customStyleMap[id] = {
      backgroundColor: color
    }
  }

  const updateUser = (id, data) => {
    if (!users[id]) users[id] = {}
    users[id] = {
      ...users[id],
      ...data
    }
  }

  const deleteUser = (id) => {
    delete customStyleMap[id]
    delete users[id]
  }

  const getUser = (id) => users[id]

  const getDelta = (left, right) =>
    j.diff(left, right)

  const send = ({ client, delta }) => {
    client.send(
      JSON.stringify({
        delta,
        customStyleMap,
        transactionId: uuid(),
        users: Object.keys(users).map(key => users[key])
      })
    )
  }

  return {
    initialRawState,
    patchState,
    getState,
    getDelta,
    getUser,
    setUser,
    updateUser,
    deleteUser,
    send
  }
}
