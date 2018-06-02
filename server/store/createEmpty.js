const { convertToRaw, EditorState } = require('draft-js')

module.exports = () => convertToRaw(EditorState.createEmpty().getCurrentContent())
