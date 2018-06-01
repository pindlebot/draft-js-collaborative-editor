import { Modifier, EditorState, SelectionState } from 'draft-js'

export const findEntityRanges = contentState => {
  let ranges = []
  let entityKey
  contentState.getBlockMap().forEach(block => {
    block.findEntityRanges((character) => {
      entityKey = character.getEntity()
      return entityKey !== null &&
      contentState.getEntity(character.getEntity()).getType() === 'CURSOR'
    }, (start, end) => {
      ranges.push({ entityKey, blockKey: block.getKey(), start, end })
    })
  })
  return ranges
}

export const removeEntities = (contentState) => {
  let ranges = findEntityRanges(contentState)
  return ranges.reduce((acc, { start, end, blockKey, entityKey }) => Modifier.applyEntity(
      acc,
      SelectionState.createEmpty(blockKey)
        .merge({ focusOffset: end, anchorOffset: start }),
      null
    ),
    contentState
  )
}

export const addEntity = (
  editorState,
  selection,
  entityData = {}
) => {
  let contentState = removeEntities(editorState.getCurrentContent())
  const contentStateWithEntity = contentState.createEntity(
    'CURSOR',
    'IMMUTABLE',
    entityData
  )
  let entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  let selectionState = new SelectionState({
    ...selection,
    anchorOffset: Math.max(selection.focusOffset - 1, 0)
  })
  console.log({ entityKey, range: selectionState.toJS() })

  const nextEditorState = EditorState.push(
    editorState,
    Modifier.applyEntity(
      contentStateWithEntity,
      selectionState,
      entityKey
    ),
    'apply-entity'
  )
  return nextEditorState
}


export const applyCursor = (
  editorState,
  selections,
) => {
  let contentState = removeEntities(editorState.getCurrentContent())
  let newEditorState = EditorState.push(
    editorState,
    contentState,
    'apply-entity'
  )
  newEditorState = selections.reduce((acc, selection) =>
    addEntity(acc, selection), newEditorState)
  return newEditorState
}