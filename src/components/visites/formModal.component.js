import {
  Modal,
  Step,
  Container,
  Button,
  Form,
  TextArea,
  List,
  Icon
} from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import config from '../../config';
import axios from 'axios';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import PVGenerator from './Forms/PVGenerator';
import moment from 'moment';
import 'moment/locale/fr';
import Signature from './Forms/Signature';
import useWindowDimensions from '../useWindowDimensions';
import PDFGenerator from './Forms/PDFGenerator';

function FormModal(props) {
  const { height, width } = useWindowDimensions();
  const [step, setstep] = useState(1);

  const [pv, setpv] = useState(null);

  const [document, setdocument] = useState('');

  const [signature, setsignature] = useState(null);

  const [signatureinteresse, setsignatureinteresse] = useState(null);
  const [informationForm, setinformationForm] = useState({
    documents: [], // Remplissage de certaines informations automatiquement
    place: !props.visite
      ? ''
      : props.visite.ETOB_ADR1 +
        ' ' +
        props.visite.ETOB_ADRCP +
        ' ' +
        props.visite.ETOB_ADRVILLE,
    nameResponsible: !props.visite ? '' : props.visite.ETOB_NOM_RESPONSABLE,
    date: moment().format('DD-MM-YYYY HH:mm')
  });
  // var informationForm, setinformationForm;
  // axios.get(config.backend.base_url + '/entreprise/' + props.visite.ETOB_SIRET + "?siret=true")
  //   .then(data => data.data)
  //   .catch(err => undefined)
  //   .then(etob => {
  //     [informationForm, setinformationForm] = useState({
  //       documents: [],
  //       place: !etob ? '' :
  //         etob.ETOB_ADR1 + '\n' +
  //         etob.ETOB_ADR2 + '\n' +
  //         etob.ETOB_ADR3 + '\n' +
  //         ' ' +
  //         etob.ETOB_ADRCP +
  //         ' ' +
  //         etob.ETOB_ADRVILLE,
  //       nameResponsible: !etob ? '' : etob.ETOB_NOM_RESPONSABLE,
  //       date: moment().format('DD-MM-YYYY HH:mm')
  //     })
  //   })



  function setStep1(pv) {
    setpv(pv);
    setstep(2);
  }

  function setStep2() {
    setstep(3);
  }

  function setStep3() {
    if (
      window.confirm(
        "Je certifie que les informations de ce procès-verbal sont exactes et je m'apprête à le signer et le faire signer."
      )
    ) {
      setstep(4);
    }
  }

  function setStep4(signature, signatureInteresse) {
    setsignature(signature);
    setsignatureinteresse(signatureInteresse);
    setstep(5);
  }

  function addDocument() {
    setinformationForm({
      ...informationForm,
      documents: [...informationForm.documents, document]
    });
    setdocument('');
  }

  function removeDocument(i) {
    setinformationForm({
      ...informationForm,
      documents: informationForm.documents.filter((item, index) => {
        return index !== i;
      })
    });
  }

  return (
    <Modal
      closeIcon={true}
      open={props.opened}
      onClose={() => {
        props.close();
      }}
    >
      <Modal.Header>Remplir un PV</Modal.Header>

      <Modal.Content>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            <Step.Group>
              <Step onClick={() => setstep(1)} active={step === 1}>
                <Step.Content>
                  <Step.Title>Choix du PV</Step.Title>
                </Step.Content>
              </Step>

              <Step
                onClick={() => setstep(2)}
                active={step === 2}
                disabled={step < 2}
              >
                <Step.Content>
                  <Step.Title> Informations </Step.Title>
                </Step.Content>
              </Step>

              <Step
                onClick={() => setstep(3)}
                active={step === 3}
                disabled={step < 3}
              >
                <Step.Content>
                  <Step.Title> Prévisualisation </Step.Title>
                </Step.Content>
              </Step>
              <Step
                onClick={() => setstep(4)}
                active={step === 4}
                disabled={step < 4}
              >
                <Step.Content>
                  <Step.Title> Signature </Step.Title>
                </Step.Content>
              </Step>
              <Step
                onClick={() => setstep(5)}
                active={step === 5}
                disabled={step < 5}
              >
                <Step.Content>
                  <Step.Title> Terminé! </Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>
          <div
            style={{
              marginTop: 30,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {step === 1 ? (
              <Button.Group>
                <Button
                  style={{ padding: 20 }}
                  onClick={() => setStep1('déclaration')}
                  color="red"
                >
                  PV de déclaration
                </Button>
              </Button.Group>
            ) : step === 2 ? (
              <Form>
                <Form.Field required>
                  <label>Nom et grade de l'enquêteur</label>
                  <input
                    value={informationForm.name}
                    onChange={e =>
                      setinformationForm({
                        ...informationForm,
                        name: e.target.value
                      })
                    }
                    placeholder="Nom de l'enquêteur"
                  ></input>
                </Form.Field>
                <Form.Field>
                  <DateTimeInput
                    label="Date et heure"
                    name="date"
                    placeholder="Date de la visite"
                    required
                    value={informationForm.date}
                    onChange={(event, { value }) =>
                      setinformationForm({ ...informationForm, date: value })
                    }
                    iconPosition="right"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Lieu</label>
                  <input
                    value={informationForm.place}
                    onChange={e =>
                      setinformationForm({
                        ...informationForm,
                        place: e.target.value
                      })
                    }
                    placeholder="Lieu"
                  ></input>
                </Form.Field>
                <Form.Field required>
                  <label>Représentant de l'entreprise</label>
                  <input
                    value={informationForm.nameResponsible}
                    onChange={e =>
                      setinformationForm({
                        ...informationForm,
                        nameResponsible: e.target.value
                      })
                    }
                    placeholder="Responsable"
                  ></input>
                </Form.Field>
                <Form.Field required>
                  <label>Qualité représentant de l'entreprise</label>
                  <input
                    value={informationForm.quality}
                    onChange={e =>
                      setinformationForm({
                        ...informationForm,
                        quality: e.target.value
                      })
                    }
                    placeholder="Qualité"
                  ></input>
                </Form.Field>
                <Form.Field required>
                  <label>Déclaration</label>
                  <TextArea
                    value={informationForm.declaration}
                    onChange={e =>
                      setinformationForm({
                        ...informationForm,
                        declaration: e.target.value
                      })
                    }
                    placeholder="Déclaration"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Liste Documents</label>
                  <List as="ul">
                    {informationForm.documents.length > 0 &&
                      informationForm.documents.map((document, i) => (
                        <List.Item key={i}>
                          {document}

                          <List.Content
                            onClick={() => removeDocument(i)}
                            verticalAlign="middle"
                            floated="right"
                          >
                            <Icon color="red" name="times circle"></Icon>
                          </List.Content>
                        </List.Item>
                      ))}
                  </List>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 8 }}>
                      <label>Ajouter un document</label>
                      <input
                        value={document}
                        onChange={e => setdocument(e.target.value)}
                        placeholder="Ajouter un document"
                      ></input>
                    </div>
                    <div
                      style={{
                        flex: 2,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        display: 'flex'
                      }}
                    >
                      <Button color="teal" icon onClick={() => addDocument()}>
                        <Icon name="add"></Icon>
                      </Button>
                    </div>
                  </div>
                </Form.Field>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => setStep2()}
                    type="submit"
                    disabled={
                      !informationForm.declaration ||
                      !informationForm.quality ||
                      !informationForm.place ||
                      !informationForm.date ||
                      !informationForm.name
                    }
                  >
                    Valider
                  </Button>
                </div>
              </Form>
            ) : step === 3 ? (
              <>
                <PVGenerator
                  width={width}
                  height={height}
                  date={moment(informationForm.date, 'DD-MM-YYYY HH:mm').format(
                    'LL'
                  )}
                  hour={moment(informationForm.date, 'DD-MM-YYYY HH:mm').format(
                    'LT'
                  )}
                  name={informationForm.name}
                  lieu={informationForm.place}
                  quality={informationForm.quality}
                  nameResponsible={informationForm.nameResponsible}
                  declaration={informationForm.declaration}
                  documents={informationForm.documents}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button color="red" onClick={() => setStep3()}>
                    Valider et signer
                  </Button>
                </div>
              </>
            ) : step === 4 ? (
              <Signature setStep4={setStep4} />
            ) : (
              <PDFGenerator
                width={width}
                height={height}
                date={moment(informationForm.date, 'DD-MM-YYYY hh:mm').format(
                  'LL'
                )}
                hour={moment(informationForm.date, 'DD-MM-YYYY hh:mm').format(
                  'LT'
                )}
                signatureDate={moment().format('LT')}
                signatureHour={moment().format('LT')}
                visiteid={props.visite.VISITE_IDENT}
                pv={pv}
                name={informationForm.name}
                lieu={informationForm.place}
                quality={informationForm.quality}
                nameResponsible={informationForm.nameResponsible}
                declaration={informationForm.declaration}
                documents={informationForm.documents}
                signature={signature}
                signatureInteresse={signatureinteresse}
              />
            )}
          </div>
        </Container>
      </Modal.Content>
    </Modal>
  );
}

FormModal.propTypes = {
  opened: PropTypes.bool,
  close: PropTypes.func,
  document: PropTypes.object
};

export default FormModal;
