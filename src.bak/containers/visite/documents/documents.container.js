import React, { Component } from 'react';

import DocumentsComponent from '../../../components/documents/documents.component';

export default class Documents extends Component {
  render() {
    return <DocumentsComponent dossier={false} {...this.props} />;
  }
}
