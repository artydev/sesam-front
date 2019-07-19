import React, { Component } from 'react';
import {
  Button,
  Icon,
  Responsive
} from 'semantic-ui-react';
import MyActivityIndicator from '../../components/myActivityIndicator.component';
import './documents.css';
import PropTypes from 'prop-types';
import DocumentsList from './documentsList';
import { Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import PouchdbServices from '../../services';
let visitesService = PouchdbServices.services.visite;
let documentsService = PouchdbServices.services.documents;

// Documents joints à une visite

// blobs, pour chrome

// function openDocument(document) {
//   const base64ImageData = document.document;
//   const contentType = document.type;

//   const byteCharacters = atob(
//     base64ImageData.substr(`data:${contentType};base64,`.length)
//   );
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//     const slice = byteCharacters.slice(offset, offset + 1024);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);

//     byteArrays.push(byteArray);
//   }
//   const blob = new Blob(byteArrays, { type: contentType });
//   const blobUrl = URL.createObjectURL(blob);

//   window.open(blobUrl, '_blank');
// }

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class Documents extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      file: null,
      documents: null,
      activeIndex: 0
    };
    this.reader = new FileReader();
  }

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };
  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };

  loadDocuments(documents) {
    documents.sort((a, b) => (a.date > b.date ? 1 : -1));
    this.setState({ documents });
  }

  componentDidMount() {
    this.props.dossier
      ? documentsService.getDocsByDossierId(this.props.dossierid).then(res => {
          this.loadDocuments(res);
        })
      : documentsService.getDocsByVisiteId(this.props.visiteid).then(res => {
          this.loadDocuments(res);
        });

    documentsService.onChanges(() =>
      this.props.dossier
        ? documentsService
            .getDocsByDossierId(this.props.dossierid)
            .then(res => {
              this.loadDocuments(res);
            })
        : documentsService.getDocsByVisiteId(this.props.visiteid).then(res => {
            this.loadDocuments(res);
          })
    );
  }

  exportToSora = async () => {
    if (
      window.confirm(
        'Êtes-vous sur de vouloir exporter cette visite dans SORA.\n Vous ne pourrez plus modifier la visite dans SESAM et vous perdrez la trame liée à la visite.'
      )
    ) {
      await visitesService.exportToSora(this.props.match.params.id);
      this.props.history.goBack();
    }
  };

  fileInputRef = React.createRef();

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, async () => {
      try {
        const { file } = this.state;

        const file64 = await getBase64(this.state.file);
        await documentsService.postDocument({
          document: file64,
          name: file.name,
          type: file.type,
          visite: this.props.dossier
            ? this.props.visitesList.map(visite => {
                return visite.visiteData.VISITE_IDENT;
              })
            : [this.props.visiteid],
          date: Date.now(),
          dossier: this.props.dossier ? this.props.dossierid : null,
          categorie: this.state.activeIndex === 0 ? 'support' : 'joint'
        });
        //ne pas oublier de resize l'image si c'est une image...
      } catch (e) {
        console.log('Error while sending file.');
      }
    });
  };

  render() {
    const { documents } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {this.props.visitesList || this.props.visiteid ? (
          <div style={{ flex: 1 }}>
            {!this.props.dossier && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20
                }}
              >
                <Button
                  icon
                  style={{ position: 'absolute', right: 10, marginTop: 4 }}
                  labelPosition="left"
                  onClick={this.exportToSora}
                >
                  <Icon name="share square"></Icon>
                  <Responsive minWidth={540}>Exporter</Responsive>
                </Button>

                <Tabs
                  value={this.state.activeIndex}
                  fullWidth
                  onChange={this.handleChange}
                  TabIndicatorProps={{ style: { backgroundColor: '#00b5ad' } }}
                >
                  <Tab label="Supports" />

                  <Tab label="Joints" />

                  <Tab label="Photos" />
                </Tabs>
              </div>
            )}
            {this.state.activeIndex != 2 && (
              <>
                <Button
                  style={{
                    background: '#3C4586',
                    color: 'white'
                  }}
                  content="Ajouter un fichier"
                  labelPosition="left"
                  icon="file"
                  onClick={() => this.fileInputRef.current.click()}
                />
                <input
                  ref={this.fileInputRef}
                  type="file"
                  hidden
                  onChange={this.fileChange}
                />
              </>
            )}
          </div>
        ) : (
          <MyActivityIndicator />
        )}

        {documents ? (
          <div style={{ flex: 10, overflowY: 'auto' }}>
            {this.props.dossier ? (
              <DocumentsList
                documents={documents.filter(document => {
                  return document.categorie === 'support';
                })}
              />
            ) : (
              <SwipeableViews
                style={{ height: '100%' }}
                slideStyle={{ height: '100%', overflow: 'auto' }}
                slideClassName="hidescrollbar"
                index={this.state.activeIndex}
                onChangeIndex={this.handleChangeIndex}
              >
                <DocumentsList
                  documents={documents.filter(document => {
                    return document.categorie === 'support';
                  })}
                />

                <DocumentsList
                  documents={documents.filter(document => {
                    return document.categorie === 'joint';
                  })}
                />
                <DocumentsList
                  documents={documents.filter(document => {
                    return document.categorie === 'photo';
                  })}
                />
              </SwipeableViews>
            )}
          </div>
        ) : (
          <MyActivityIndicator />
        )}
      </div>
    );
  }
}

Documents.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  dossierid: PropTypes.number,
  visitesList: PropTypes.array,
  dossier: PropTypes.bool,
  visiteid: PropTypes.number
};

export default Documents;
