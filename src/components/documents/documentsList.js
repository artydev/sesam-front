import React, { Component } from 'react';
import { Button, Header, Icon, Input } from 'semantic-ui-react';
import DocumentModal from './documentModal.component';

import PouchdbServices from '../../services';
let documentsService = PouchdbServices.services.documents;


function removeExtension(documentname) {
  const split = documentname.split('.');
  return [split.slice(0, -1).join('.'), split.slice(-1)];
}

export default class documentsList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false,
      documentSelected: null,
      documentname: null,
      documentEdited: null
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.clickCount = null;
    this.singleClickTimer = '';
  }

  handleDoubleClick = document => {
    this.editName(document);
  };
  handleClicks(document) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.singleClickTimer = setTimeout(
        function () {
          this.clickCount = 0;
        }.bind(this),
        300
      );
    } else if (this.clickCount === 2) {
      clearTimeout(this.singleClickTimer);
      this.clickCount = 0;
      this.handleDoubleClick(document);
    }
  }

  showModal(document) {
    this.setState({
      modal: true,
      documentSelected: document
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  handleChangeName(event, data) {
    this.setState({ documentname: data.value });
  }

  editName(document) {
    this.setState({
      documentEdited: document,
      documentname: removeExtension(document.name)[0]
    });
  }

  validateName(document) {
    document.name =
      this.state.documentname + '.' + removeExtension(document.name)[1];
    documentsService
      .editName(document)
      .then(res => console.log('ok'))
      .catch(e => console.log(e));
  }

  getColor(type) {
    if (type.includes('image')) {
      return ['teal', 'file image'];
    } else if (type.includes('pdf')) {
      return ['red', 'file pdf'];
    } else if (type.includes('sheet')) {
      return ['green', 'file excel'];
    } else if (type.includes('word') || type.includes('opendocument.text')) {
      return ['blue', 'file word'];
    } else {
      return ['grey', 'file'];
    }
  }

  async deleteDocument(e, document) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    window.confirm('Êtes-vous sûr de vouloir supprimer ce document?') &&
      (await documentsService.deleteDocument(document));
  }

  render() {
    const { documents } = this.props;
    return (
      <>
        {this.state.modal && this.state.documentSelected && (
          <DocumentModal
            document={this.state.documentSelected}
            opened={this.state.modal}
            close={() => this.closeModal()}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingBottom: 110
          }}
        >
          {documents.map((document, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Button

                style={{
                  margin: '1em',
                  marginBottom: '1em',
                  display: 'flex',
                  height: '10em',
                  width: '10em',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
                basic
                color={this.getColor(document.type)[0]}
              >
                <>
                  <Button as="a"
                    color={this.getColor(document.type)[0]}
                    style={{ background: 'none' }}
                    icon
                    href={
                      !document.type.includes('image')
                        ? document.document
                        : undefined
                    }
                    download={document.name}
                    onClick={() => {
                      document.type.includes('image') && this.showModal(document);
                    }}>
                    {document.type.includes('image') ? (
                      <img
                        src={document.document}
                        style={{ maxWidth: '8em', maxHeight: '8em' }}
                      ></img>
                    ) : (
                        <Icon
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '4em',
                            margin: 0,
                            color: this.getColor(document.type)[0]
                          }}
                          name={this.getColor(document.type)[1]}
                        ></Icon>
                      )}
                  </Button>
                  <Icon
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 0,
                      fontSize: '2em',
                      cursor: 'pointer'
                    }}
                    name="times"
                    color="red"
                    onClick={e => this.deleteDocument(e, document)}
                  ></Icon>
                </>
              </Button>

              <div
                className="hidescrollbar"
                style={{
                  width: '10em',
                  display: 'flex',
                  justifyContent: 'center',
                  height: 50
                }}
              >
                {this.state.documentEdited != document ? (
                  <>
                    <Header
                      onClick={() => this.handleClicks(document)}
                      as="h4"
                      className="hidescrollbar"
                      style={{
                        overflowWrap: 'break-word',
                        overflowX: 'hidden'
                      }}
                      color={this.getColor(document.type)[0]}
                    >
                      {document.name}
                    </Header>
                    <Icon
                      onClick={() => this.editName(document)}
                      style={{ marginLeft: 5, cursor: 'pointer' }}
                      name="pencil"
                      color="grey"
                    ></Icon>
                  </>
                ) : (
                    <div style={{ height: 30 }}>
                      <Input
                        style={{ height: 30 }}
                        value={this.state.documentname}
                        onChange={this.handleChangeName}
                      ></Input>
                      <Icon
                        onClick={() => this.validateName(document)}
                        name="check"
                        color="grey"
                        style={{ marginLeft: 5, cursor: 'pointer' }}
                      ></Icon>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
