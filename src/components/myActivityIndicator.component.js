import React, { Component } from 'react';

import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';

export default class MyActivityIndicator extends Component {
  render() {
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 20,
          display: 'flex'
        }}
      >
        <Digital size={30} color="#3C4586"></Digital>
      </div>
    );
  }
}
