import React from 'react'
import { render } from 'react-dom'
import {
  EditorState,
  convertFromRaw
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Editor, decorator } from '../src'
import PropTypes from 'prop-types'

class Users extends React.Component {
  static propTypes = {
    users: PropTypes.object,
    customStyleMap: PropTypes.object
  }

  render () {
    const { users, customStyleMap } = this.props
    return (
      <div className='users'>
        {Object.keys(customStyleMap).map(key =>
          <div style={customStyleMap[key]}>
            {key}
          </div>
        )}
      </div>
    )
  }
}
let host = process.env.NODE_ENV !== 'production'
  ? 'ws://' + window.document.location.host.replace(/:.*/, '') + ':1234'
  : window.location.origin.replace(/^http/, 'ws')

let contentState = convertFromRaw({
  blocks: [{
    key: 'A',
    depth: 0,
    text: '',
    data: {},
    inlineStyleRanges: [],
    entityRanges: []
  }],
  entityMap: {}
})

class App extends React.Component {
  state = {
    userId: undefined
  }

  componentDidMount () {
    this.ws = new window.WebSocket(host)
    let userId = document.cookie.split('=')[1]
    if (!this.state.userId) {
      this.setState({ userId })
    }
  }

  componentWillUnmount () {
    this.ws.close()
    delete this.ws
  }

  render () {
    if (!this.state.userId) return false
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'column'} style={{padding: '1em'}}>
            <Editor
              autoFocus
              ws={this.ws}
              userId={this.state.userId}
            />
          </div>
        </div>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
