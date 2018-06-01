import React from 'react'
import { render } from 'react-dom'
import {
  Editor,
  EditorState,
  convertToRaw,
  Modifier,
  CompositeDecorator,
  SelectionState,
  RichUtils,
  convertFromRaw
} from 'draft-js'
import debounce from 'debounce'
import 'draft-js/dist/Draft.css'
import { patch } from 'jsondiffpatch'
import { applyCursor, removeEntities, decorator } from '../src'

const genID = () => Math.random().toString(36).substr(2, 9)

let users = {}

class App extends React.Component {
  state = {
    editorState: EditorState.createEmpty(decorator),
    customStyleMap: {}
  }

  componentDidMount () {
    this.userId = document.cookie.split('=')[1]
    // let host = window.document.location.host.replace(/:.*/, '');
    // let url = 'ws://' + host + ':1234'
    let host = location.origin.replace(/^http/, 'ws')
    console.log(host)
    this.ws = new WebSocket(host)
    this.ws.onmessage = (event) => {
      let data = JSON.parse(event.data)
      let { delta, customStyleMap, users } = data
      if (!delta) return      
      let raw = convertToRaw(this.state.editorState.getCurrentContent())
      let patched = patch(raw, delta)
      let editorState = EditorState.push(
        this.state.editorState,
        convertFromRaw(patched)
      )
      editorState = removeEntities(editorState)
      if (users) {
        let keys = Object.keys(users)
          .filter(key => users[key].selection && key !== this.userId)
        editorState = keys.reduce((acc, key) =>
          applyCursor(
            acc,
            users[key].selection,
          ), editorState
        )
        window.localStorage.setItem(
          'raw',
          JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        )
      }
      this.setState({
        editorState,
        customStyleMap: {
          ...customStyleMap,
          [this.userId]: {
            backgroundColor: 'transparent'
          }
        }
      })
    }
  }

  notify = () => {
    let raw = convertToRaw(this.state.editorState.getCurrentContent())
    let selection = this.state.editorState.getSelection().toJS()
    this.ws.send(
      JSON.stringify({
        raw,
        selection: selection,
        timestamp: Date.now(),
        id: this.userId
      })
    )
  }

  process = debounce(() => {
    this.notify()
  }, 1000)

  onChange = editorState => {
    this.process()
    let nextEditorState = editorState
    if (!editorState.getDecorator()) {
      nextEditorState = EditorState.set('decorator', decorator)
    }
    let currentInlineStyles = editorState.getCurrentInlineStyle()
    if (!currentInlineStyles.has(this.userId)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, this.userId)
    }

    let keys = Object.keys(this.state.customStyleMap)
      .filter(key => key !== this.userId)

    nextEditorState = keys.reduce((acc, key) =>
      currentInlineStyles.has(key)
        ? RichUtils.toggleInlineStyle(acc, key)
        : acc, nextEditorState
    )

    this.setState({ editorState: nextEditorState })
  }

  setRef = ref => {
    this.editor = ref
  }

  render () {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'column'} style={{padding: '1em'}}>
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            ref={this.setRef}
            autoFocus
            customStyleMap={this.state.customStyleMap}
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
