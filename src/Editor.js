import React from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  convertFromRaw
} from 'draft-js'
import debounce from 'debounce'
import { decorator } from './decorator'
import { getCursorStyle } from './getCursorStyle'
import { applyDelta } from './applyDelta'
import { unstable_deferredUpdates as deferredUpdates } from 'react-dom'

class CollaborativeEditor extends React.Component {
  static propTypes = {
    editorState: PropTypes.object,
    customStyleMap: PropTypes.object,
    update: PropTypes.func
  }

  state = {
    editorState: EditorState.createEmpty(decorator),
    customStyleMap: {},
    cursors: []
  }

  _isUnmounted = false

  handleMessage = ({ delta, customStyleMap, users, transactionId }) => {
    let editorState = this.state.editorState
    let nextEditorState = applyDelta(editorState, delta)
    this.setState({
      customStyleMap: {
        ...customStyleMap,
        [this.props.userId]: {
          backgroundColor: 'transparent'
        }
      },
      editorState: nextEditorState
    }, () => {
      deferredUpdates(() => {
        let cursors = users
          .filter(user => user.selection && user.id !== this.props.userId)
          .map(({ selection, id }) => getCursorStyle(nextEditorState, selection))
          .filter(style => style)
        this.setState({
          cursors
        })
      })
    })
  }

  componentDidMount () {
    console.log(this.props)
    this.props.ws.onmessage = (event) => {
      if (this._isUnmounted) return
      this.handleMessage(JSON.parse(event.data))
    }

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    this._isUnmounted = true
    window.removeEventListener('resize', this.resize)
  }

  resize = debounce((evt) => {
    if (this.state.cursors.length) {
      this.setState({ cursors: [] })
    }
  }, 200)

  broadcast = debounce(() => {
    let editorState = this.state.editorState
    let contentState = editorState.getCurrentContent()
    let raw = convertToRaw(contentState)
    this.props.ws.send(
      JSON.stringify({
        raw,
        selection: editorState.getSelection().toJS(),
        timestamp: Date.now(),
        id: this.props.userId
      })
    )
  }, 300)

  onChange = editorState => {
    this.broadcast()
    let nextEditorState = editorState
    if (!nextEditorState.getDecorator()) {
      nextEditorState = EditorState.set('decorator', decorator)
    }
    let currentInlineStyles = nextEditorState.getCurrentInlineStyle()
    if (!currentInlineStyles.has(this.props.userId)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, this.props.userId)
    }

    let keys = Object.keys(this.state.customStyleMap)
      .filter(key => key !== this.props.userId)

    nextEditorState = keys.reduce((acc, key) =>
      currentInlineStyles.has(key)
        ? RichUtils.toggleInlineStyle(acc, key)
        : acc, nextEditorState
    )
    this.setState({ editorState: nextEditorState })
  }

  render () {
    const { cursors } = this.state
    const { ws, userId, ...rest } = this.props
    return (
      <React.Fragment>
        {cursors.map((cursor, i) =>
          <span className={'cursor'} style={cursor} key={i} />
        )}
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          customStyleMap={this.state.customStyleMap}
          {...rest}
        />
      </React.Fragment>
    )
  }
}

export default CollaborativeEditor
