import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
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
import { patch } from 'jsondiffpatch'
import { decorator } from './decorator'
import { applyCursor } from './applyCursor'

class CollaborativeEditor extends React.Component {
  static propTypes = {
    ws: PropTypes.object
  }

  state = {
    customStyleMap: {}
  }

  componentDidMount () {
    this.userId = document.cookie.split('=')[1]

    this.props.ws.onmessage = (event) => {
      let data = JSON.parse(event.data)
      let { delta, customStyleMap, users } = data
      if (!delta) return      
      let raw = convertToRaw(this.props.editorState.getCurrentContent())
      let patched = patch(raw, delta)
      let editorState = EditorState.push(
        this.props.editorState,
        convertFromRaw(patched)
      )
      if (users) {
        let cursors = Object.keys(users)
          .filter(key => users[key].selection && key !== this.props.userId)
          .map(key => users[key].selection)
        editorState = applyCursor(editorState, cursors)
      }
      this.props.onChange(editorState)

      this.setState({
        customStyleMap: {
          ...customStyleMap,
          [this.props.userId]: {
            backgroundColor: 'transparent'
          }
        }
      })
    }
  }

  notify = () => {
    let raw = convertToRaw(this.props.editorState.getCurrentContent())
    let selection = this.props.editorState.getSelection().toJS()
    this.props.ws.send(
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
  }, 300)

  onChange = editorState => {
    this.process()
    let nextEditorState = editorState
    if (!editorState.getDecorator()) {
      nextEditorState = EditorState.set('decorator', decorator)
    }
    let currentInlineStyles = editorState.getCurrentInlineStyle()
    if (!currentInlineStyles.has(this.props.userId)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, this.props.userId)
    }

    let keys = Object.keys(this.state.customStyleMap)
      .filter(key => key !== this.userId)

    nextEditorState = keys.reduce((acc, key) =>
      currentInlineStyles.has(key)
        ? RichUtils.toggleInlineStyle(acc, key)
        : acc, nextEditorState
    )
    this.props.onChange(nextEditorState)
  }

  render () {
    const { editorState, ws, ...rest } = this.props
    return (
      <Editor
        onChange={this.onChange}
        editorState={this.props.editorState}
        customStyleMap={this.state.customStyleMap}
        {...rest}
      />   
    )
  }
}

export default CollaborativeEditor
