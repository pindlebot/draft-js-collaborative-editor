import React from 'react'
import { render } from 'react-dom'
import {
  EditorState,
  convertToRaw,
  Modifier,
  SelectionState,
  RichUtils,
  convertFromRaw
} from 'draft-js'
import debounce from 'debounce'
import 'draft-js/dist/Draft.css'
import { Editor, decorator } from '../src'

let host = process.env.NODE_ENV !== 'production' 
  ? 'ws://' + window.document.location.host.replace(/:.*/, '') + ':1234'
  : location.origin.replace(/^http/, 'ws')

class App extends React.Component {
  state = {
    editorState: EditorState.createEmpty(decorator),
  }

  ws = new WebSocket(host)

  onChange = editorState => {    
    this.setState({ editorState })
  }

  componentDidMount () {
    this.userId = document.cookie.split('=')[1]
  }

  render () {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'column'} style={{padding: '1em'}}>
            <Editor
              onChange={this.onChange}
              editorState={this.state.editorState}
              autoFocus
              ws={this.ws}
              userId={this.userId}
            />
          </div>
          <div className={'column'}>
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
