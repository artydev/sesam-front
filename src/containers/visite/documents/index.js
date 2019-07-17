import React from 'react';
import DocumentsComponent from './documents.container';

export default class FileNavigation extends React.Component {
  render() {
    return <DocumentsComponent {...this.props} dossier={false} />;
  }
}
