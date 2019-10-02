import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

export default function MyDraggable(props) {
  return props.locked ? (
    <Draggable
      key={props.task.id.toString()}
      draggableId={props.task.id.toString()}
      index={props.index}
    >
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  ) : (
    <div>{props.children}</div>
  );
}
