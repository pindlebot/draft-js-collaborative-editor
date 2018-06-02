import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

const destroyElement = (element) => {
  element.parentNode.removeChild(element)
}

const createDummyElement = (parent, focusOffset, text) => {
  let elem = parent.querySelector('[data-text="true"]')
  let clone = elem.cloneNode()
  console.log(clone)
  clone.innerText = text.slice(0, focusOffset)
  clone.style.position = 'absolute'
  clone.style.visibility = 'hidden'
  clone.style.top = 0
  clone.style.left = 0
  parent.appendChild(clone)

  return clone
}

let cache = new Map()

const getRect = (selection, text) => {
  console.log(cache)
  let { focusKey, focusOffset } = selection
  let cacheKey = `${focusKey}-${focusOffset}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  let offsetKey = DraftOffsetKey.encode(focusKey, 0, 0)
  let elem = document.querySelector(`[data-offset-key="${offsetKey}"] span`)
  if (elem) {
    let clone = createDummyElement(elem, focusOffset, text)
    let rect = clone.getBoundingClientRect()
    if (rect) {
      cache.set(cacheKey, rect)
    }
    destroyElement(clone)
  }
  return cache.has(cacheKey) ? cache.get(cacheKey) : undefined
}

export const getCursorStyle = (editorState, selection) => {
  let text = editorState.getCurrentContent().getBlockForKey(
    selection.focusKey
  ).getText()
  let rect = getRect(selection, text)
  if (rect) {
    return {
      left: rect.left + rect.width,
      top: rect.top,
      height: rect.height
    }
  }
  return undefined
}
