import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

const destroyElement = (element) => {
  element.parentNode.removeChild(element)
}

const createEphemeralElement = (elem, focusOffset, text) => {
  let clone = elem.cloneNode()
  clone.innerText = ('' + elem.innerText).slice(0, focusOffset)
  clone.contenteditable = false
  clone.style.position = 'absolute'
  clone.style.visibility = 'hidden'
  clone.style.top = 0
  clone.style.left = 0
  elem.appendChild(clone)

  return clone
}

let cache = new Map()

const getTextRectangle = (selection, text) => {
  let { focusKey, focusOffset } = selection
  let cacheKey = `${focusKey}-${focusOffset}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  let offsetKey = DraftOffsetKey.encode(focusKey, 0, 0)
  let block = document.querySelector(`[data-offset-key="${offsetKey}"]`)
  let elem = block && block.firstChild && block.firstChild.firstChild
  if (elem) {
    let clone = createEphemeralElement(elem, focusOffset, text)
    let rect = clone.getBoundingClientRect()
    destroyElement(clone)
    if (rect) {
      cache.set(cacheKey, rect.toJSON())
      return rect
    }
  }
}

export const getCursorStyle = (editorState, selection) => {
  let text = editorState.getCurrentContent().getBlockForKey(
    selection.focusKey
  ).getText()
  let rect = getTextRectangle(selection, text)
  if (rect) {
    return {
      left: rect.left + rect.width,
      top: rect.top,
      height: rect.height
    }
  }
  return undefined
}
