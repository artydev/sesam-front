import React, { Component } from 'react';
import TrameComponent from './trame';

import SwipeableViews from 'react-swipeable-views';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default class TrameList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      onDrag: false
    };
  }

  render() {
    const { ...props } = this.props;
    let tasks =
      this.props.activeIndex === 0
        ? this.props.taskListAvant
        : this.props.activeIndex === 1
        ? this.props.taskListPendant
        : this.props.taskListAprès;

    return !this.props.locked ? (
      <SwipeableViews
        style={{ height: '100%' }}
        className="hidescrollbar"
        index={this.props.activeIndex}
        onChangeIndex={this.props.handleChangeIndex}
        slideClassName="hidescrollbar"
      >
        <TrameComponent taskList={tasks} {...props} />
        <TrameComponent taskList={tasks} {...props} />
        <TrameComponent taskList={tasks} {...props} />
      </SwipeableViews>
    ) : (
      <div className="hidescrollbar" slideClassName="hidescrollbar">
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TrameComponent taskList={tasks} {...props} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
