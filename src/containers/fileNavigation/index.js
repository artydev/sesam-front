import React from 'react';
import FileNavigationComponent from './fileNavigation.container';

export default class FileNavigation extends React.Component {
  render() {
    return <FileNavigationComponent {...this.props} />;
  }
}
