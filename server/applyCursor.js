
const applyCursorToRaw = (raw, selectionState, entityData = {}) => {
  const entityKeys = Object.keys(raw.entityMap || {})
  const cursorEntityKey = entityKeys.length
  const entityMap = {
    ...raw.entityMap,
    [cursorEntityKey]: {
      type: 'CURSOR',
      mutability: 'IMMUTABLE',
      data: entityData
    }
  }
  const { focusKey, focusOffset } = selectionState
  const blocks = raw.blocks.reduce((acc, contentBlock) => {
    let block = contentBlock
    if (block.key !== focusKey) {
      acc.push(block)
      return acc
    }
    block.entityRanges.push({
      offset: Math.max(0, focusOffset - 1),
      length: 1,
      key: cursorEntityKey
    })
    
    acc.push(block)
    return acc
  }, [])
  return {
    entityMap,
    blocks
  }
}

module.exports = applyCursorToRaw