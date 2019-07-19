/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './photo.css';
import FullScreen from 'react-full-screen';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { Button } from '@material-ui/core';
import Jimp from 'jimp';
import { Buffer } from 'buffer';
import { PropTypes } from 'prop-types';
import PouchdbServices from '../../../services';
let documentsService = PouchdbServices.services.documents;

class Photo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFull: false,
      loaded: false
    };
  }
  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  close = () => {
    this.props.setActiveTab(0);
    this.goFull();
  };

  componentDidMount() {
    this.goFull();
  }

  loaded = () => {
    this.setState({ loaded: true });
  };

  getFileSize = dataUri => {
    const size = dataUri.length * (3 / 4) - 2;
    return size;
  };

  convertImage = dataUri =>
    new Promise(resolve => {
      Jimp.read(
        Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64')
      ).then(img => {
        img.getBase64(Jimp.MIME_JPEG, (err, res) => {
          resolve(res);
        });
      });
    });

  reSizeImage = (dataUri, quality) =>
    new Promise(resolve => {
      Jimp.read(
        Buffer.from(dataUri.replace(/^data:image\/jpeg;base64,/, ''), 'base64')
      ).then(img => {
        const n = img.quality(quality);
        n.getBase64(Jimp.MIME_JPEG, (err, res) => {
          resolve(res);
        });
      });
    });

  async onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...

    let size = this.getFileSize(dataUri);

    dataUri = await this.convertImage(dataUri);

    let img = dataUri;
    let quality = 90;
    while (size > 100000) {
      img = await this.reSizeImage(dataUri, quality);
      size = this.getFileSize(img);
      quality = quality - quality / 10;
    }

    try {
      await documentsService.postDocument({
        document: img,
        name: Date.now() + '.jpeg',
        type: 'image/jpeg',
        visite: [this.props.visiteid],
        date: Date.now(),
        dossier: null,
        categorie: 'photo'
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'black' }}>
        {!this.state.loaded && <Spinner />}
        <br />
        <FullScreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          {this.state.isFull && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Camera
                onCameraStart={() => this.loaded()}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                isImageMirror={false}
                onTakePhoto={dataUri => {
                  this.onTakePhoto(dataUri);
                }}
              />
              <div
                style={{
                  marginTop: 50,

                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  size="large"
                  color="secondary"
                  variant="outlined"
                  onClick={() => this.close()}
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </FullScreen>
      </div>
    );
  }
}

Photo.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  visiteid: PropTypes.number.isRequired
};

export default Photo;
