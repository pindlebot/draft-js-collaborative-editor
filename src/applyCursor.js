import { Modifier, EditorState, SelectionState } from 'draft-js'

export const removeEntities = (editorState) => {
  let nextContentState = editorState.getCurrentContent()
  nextContentState.getBlockMap().forEach(block => {
    block.findEntityRanges((character) => {
      if (!character) return false
      const entityKey = character.getEntity()
      if (entityKey === null) return false
      const entity = nextContentState.getEntity(entityKey)
      const entityType = entity.getType()
      return entityType === 'CURSOR'
    }, (start, end) => {
      nextContentState = Modifier.applyEntity(
        nextContentState,
        new SelectionState({
          focusKey: block.getKey(),
          anchorKey: block.getKey(),
          focusOffset: end,
          anchorOffset: start
        }),
        null
      )
    })
  })
  return EditorState.push(
    editorState,
    nextContentState,
    'apply-entity'
  )
}

export const applyCursor = (
  editorState,
  selection,
  entityData = {}
) => {
  let contentState = editorState.getCurrentContent()
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
