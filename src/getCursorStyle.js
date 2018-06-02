import { textWidth } from 'draft-js-text-width'

export const getCursorStyle = (editorState, selection) => {
  let rect = textWidth(selection)
  if (rect) {
    return {
      left: rect.left + rect.width,
      top: rect.top,
      height: rect.height
    }
  }
  return undefined
}
