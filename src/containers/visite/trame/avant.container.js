import React, { Component } from 'react';

import TrameComponent from './trame.container';
import EditComponent from './edit';

export default class Avant extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return this.props.editMode ? (
      <EditComponent {...this.props}></EditComponent>
    ) : (
      <TrameComponent {...this.props} taskList={this.props.trame.trameAvant} />
    );
  }
}
