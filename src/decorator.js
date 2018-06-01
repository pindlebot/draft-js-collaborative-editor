import React from 'react'
import { CompositeDecorator } from 'draft-js'

class Cursor extends React.Component {
  render() {
    const style = {
      animation: 'blink-empty 1s infinite',
      borderLeft: 'transparent solid 1px',
    }
    return (
      <span data-offset-key={this.props.offsetkey}>
        {this.props.children}
        <span className='cursor' contentEditable={false} readOnly style={style} />
      </span>
    )
  }
}

function strategy(contentBlock, cb, contentState) {
  if (!contentState) return;
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey === null) {
      return false
    }
    const entity = contentState.getEntity(entityKey)
    const entityType = entity.getType()
    const entityData = entity.getData()
    return (
      entityType === 'CURSOR'
    );
  }, cb)
}

export const decorator = new CompositeDecorator([{
  strategy: strategy,
  component: Cursor
}])
