import React, { Component } from 'react';

import DocumentComponent from '../../components/documents/documents.component';


export default class Documents extends Component {
  render() {
    return <DocumentComponent dossier={true} {...this.props} />;

  }
}
