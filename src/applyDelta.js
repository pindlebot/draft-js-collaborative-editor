import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'
import { create } from 'jsondiffpatch'

const j = create({
  objectHash: function (obj, index) {
    return obj.key || '$$index:' + index
  }
})

export const applyDelta = (editorState, delta) => {
  if (!delta) return editorState
  let raw = convertToRaw(editorState.getCurrentContent())
  let patched = j.patch(raw, delta)
  let currentContent = convertFromRaw(patched)
  return EditorState.push(editorState, currentContent)
}
