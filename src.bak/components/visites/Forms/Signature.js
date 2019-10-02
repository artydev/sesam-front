import React, { Component } from 'react';
import { Container, Card, Button } from 'semantic-ui-react';

import SignatureCanvas from 'react-signature-canvas';

import PropTypes from 'prop-types';
class Signature extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      trimmedDataURL: null,
      trimmedDataURLInteresse: null
    };
  }
  nextStep = () => {
    this.setState(
      {
        trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
        trimmedDataURLInteresse: this.sigPadInteresse
          .getTrimmedCanvas()
          .toDataURL('image/png')
      },
      () => {
        this.props.setStep4(
          this.state.trimmedDataURL,
          this.state.trimmedDataURLInteresse
        );
      }
    );
  };

  sigPad = {};
  sigPadInteresse = {};

  clear = () => {
    this.sigPad.clear();
  };

  clearInteresse = () => {
    this.sigPadInteresse.clear();
  };

  render() {
    const { trimmedDataURL, trimmedDataURLInteresse } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Container
          textAlign="center"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <>
            <div style={{ fontStyle: 'italic' }}>Signature de l'auteur</div>
            <Card style={{ height: 200, width: 300 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SignatureCanvas
                  canvasProps={{ width: 300, height: 200 }}
                  ref={ref => {
                    this.sigPad = ref;
                  }}
                />
              </div>
            </Card>
            <div>
              <Button onClick={this.clear}>Effacer</Button>
              {/* <button onClick={this.trim}>Trim</button> */}
            </div>
            <br />

            <div style={{ fontStyle: 'italic' }}>Signature de l'intéressé</div>
            <Card style={{ height: 200, width: 300 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SignatureCanvas
                  canvasProps={{ width: 300, height: 200 }}
                  ref={ref => {
                    this.sigPadInteresse = ref;
                  }}
                />
              </div>
            </Card>

            <br />
            <div>
              <Button onClick={this.clearInteresse}>Effacer</Button>
              {/* <button onClick={this.trimInteresse}>Trim</button> */}
            </div>
          </>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="blue" onClick={() => this.nextStep()}>
            {' '}
            Signer et générer le PV
          </Button>
        </div>
      </div>
    );
  }
}

Signature.propTypes = {
  setStep4: PropTypes.func
};

export default Signature;
