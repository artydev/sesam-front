/* eslint-disable no-undef */
import React from 'react';
import {
  Form,
  Grid,
  GridRow,
  GridColumn,
  TextArea,
  Button,
  Message,
  Container,
  Checkbox
} from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';
import { DateInput } from 'semantic-ui-calendar-react';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import PouchDbServices from '../../services';
import ControleComponent from './controles.container';
import EntrepriseField from '../../components/fields/entrepriseField.component';
let visitesService = PouchDbServices.services.visite;
let dossierService = PouchDbServices.services.dossier;
const moment = require('moment');

function mapStateToProps(state) {
  return {
    agentIdent: state.dataReducer.AGENT_DD_IDENT
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl)),
    changeActivePage: value => dispatch(changeActivePage('mesDossiers', value))
  };
}

class CreateVisiteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VIS_CPMM: false,
      VIS_MUTUALISEE: false,
      VIS_DATE: moment().format('DD-MM-YYYY'),
      ETOB_RAISON_SOCIALE: '',
      ETOB_SIRET: '',
      ETOB_IDENT: -1,
      VIS_OBSERVATIONS: '',
      trame: '',
      trameList: [{ _id: 0, name: 'Aucune trame' }],
      controlesList: [],
      message: '', //Message d'erreur si il y en a
      DOSSIER_IDENT: -1,
      dossierText: '',
      visiteIdent: undefined, //Identifiant de la visite dans le cas de modification
      visite: undefined //Visite dans le cas de modification
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.visiteId) {
      //Si on est sur une page de modification de visite
      this.props.changeNameOfPage('Modification de visite');
      this.props.changeBackUrl(
        '/visite/' + this.props.match.params.visiteId.toString()
      );
      this.props.changeActivePage(
        '/modify-visite/' + this.props.match.params.visiteId
      );
      // On charge la visite et les controles correspondant
      const visite = await visitesService.getVisiteById(
        this.props.match.params.visiteId
      );
      const controles = await visitesService.getControlesByVisite(
        this.props.match.params.visiteId
      );
      const dossier = await dossierService.getDossierById(
        controles[0].DOSSIER_IDENT
      ); //Dossier correspondant au premier contrôle (pour régler le dossier par défaut dans la création de controle)
      let controlesList = [];
      for (let i in controles) {
        // On recrée la liste des controles de la visite
        const dossierControle = await dossierService.getDossierById(
          controles[i].DOSSIER_IDENT
        ); //Dossier correspondant à la visite
        controlesList = controlesList.concat([
          {
            ...controles[i],
            dossierText: dossierControle.DOSSIER_LIBELLE,
            activiteText: controles[i].ACDG_CODE_LIB_NIVEAU3,
            ident: controles[i].CONTROLE_IDENT,
            exists: true //indique que le contrôle existe déjà dans la base de données
          }
        ]);
      }
      this.setState({
        ...visite,
        controlesList,
        message: '',
        dossierText: dossier.DOSSIER_LIBELLE,
        visiteIdent: visite.VISITE_IDENT,
        DOSSIER_IDENT: dossier.DOSSIER_IDENT,
        visite
      });
    } else {
      //Si on est en création de visite
      this.props.changeNameOfPage('Création de visite');
      this.props.changeBackUrl('/dossier/' + this.props.match.params.dossierId);
      this.props.changeActivePage(
        '/nouvelle-visite/' + this.props.match.params.dossierId
      );
      PouchDbServices.services.trame
        .getAllDocs()
        .then(res => {
          this.setState({ trameList: this.state.trameList.concat(res) });
        })
        .catch(() => {});
      const dossier = await dossierService.getDossierById(
        this.props.match.params.dossierId
      );
      this.setState({
        dossierText: dossier.DOSSIER_LIBELLE,
        DOSSIER_IDENT: parseInt(this.props.match.params.dossierId)
      });
    }
  }

  displayTrame = () => {
    if (this.props.match.params.dossierId) {
      return (
        <Form.Group style={{ margin: 0 }}>
          <Grid style={{ width: '100%', margin: 0 }} verticalAlign="bottom">
            <GridRow style={{ display: 'flex' }}>
              <Grid.Column width={16} style={{ padding: 0 }}>
                <Form.Select
                  fluid
                  placeholder="Trame"
                  label="Trame associée"
                  style={{ width: '100%' }}
                  options={this.state.trameList.map(trame => ({
                    key: trame._id,
                    text: trame.name,
                    value: trame
                  }))}
                  onChange={(e, { value }) => this.setState({ trame: value })}
                />
              </Grid.Column>
            </GridRow>
          </Grid>
        </Form.Group>
      );
    }
  };
  displayMessage = message => {
    if (message) {
      return (
        <Message
          fluid
          negative
          onDismiss={() => this.setState({ message: '' })}
          style={{ marginTop: '10px' }}
        >
          <Message.Header style={{ marginBottom: '5px' }}>
            Validation Impossible
          </Message.Header>
          <Message.Content>{message}</Message.Content>
        </Message>
      );
    }
  };

  testEntries() {
    if (
      !this.state.ETOB_RAISON_SOCIALE ||
      !this.state.VIS_DATE ||
      !this.state.trame
    ) {
      this.setState({
        message: "Veillez à renseigner l'ensemble des champs obligatoires"
      });
      return false;
    }
    if (this.state.ETOB_SIRET.length !== 14) {
      this.setState({
        message:
          "Le numéro SIRET renseigné n'est pas valide : il doit être composé de 14 chiffres"
      });
      return false;
    }
    if (this.state.controlesList.length === 0) {
      this.setState({
        message:
          'Veuillez rentrer au moins une action de contrôle. Vous pourrez la modifier par la suite si besoin'
      });
      return false;
    }
    return true;
  }

  async onSubmit() {
    if (this.testEntries()) {
      try {
        // si connecté à internet, on récupère des informations sur l'établissement
        const etablissement = await axios.get(
          config.backend.base_url + '/entreprise/' + this.state.ETOB_IDENT
        );
        var etablissementInfos = {
          ETOB_ADR1: etablissement.data.ETOB_ADR1,
          ETOB_ADR2: etablissement.data.ETOB_ADR2,
          ETOB_ADR3: etablissement.data.ETOB_ADR3,
          ETOB_ADRCP: etablissement.data.ETOB_ADRCP,
          ETOB_ADRVILLE: etablissement.data.ETOB_ADRVILLE,
          ETOB_ENSEIGNE_LIB: etablissement.data.ETOB_ENSEIGNE_LIB,
          ETOB_NOM_RESPONSABLE: etablissement.data.ETOB_NOM_RESPONSABLE
        };
      } catch (e) {
        etablissementInfos = {};
      }
      if (this.props.match.params.visiteId) {
        // Si on est dans le cas d'une modification de visite
        visitesService
          .updateVisite(
            {
              ...this.state.visite,
              ...etablissementInfos,
              ETOB_RAISON_SOCIALE: this.state.ETOB_RAISON_SOCIALE,
              ETOB_SIRET: this.state.ETOB_SIRET,
              VIS_DATE: this.state.VIS_DATE,
              VIS_OBSERVATIONS: this.state.VIS_OBSERVATIONS,
              VIS_MUTUALISEE: this.state.VIS_MUTUALISEE,
              VIS_CPMM: this.state.VIS_CPMM,
              trame: this.state.trame,
              AG_IDENT: this.props.agentIdent
            },
            this.state.controlesList
          )
          .then(() => {
            window.alert('La visite a bien été modifiée.');
            this.props.history.push(
              '/visite/' + this.state.visite.VISITE_IDENT
            );
          });
      } else {
        // Si on est dans le cas d'une création de visite
        const ident = parseInt(
          // On ajoute un identifiant à la visite
          Date.now().toString() + this.props.agentIdent.toString()
        );
        visitesService
          .postControlesByVisite(
            {
              ...etablissementInfos,
              VISITE_IDENT: ident,
              ETOB_RAISON_SOCIALE: this.state.ETOB_RAISON_SOCIALE,
              ETOB_SIRET: this.state.ETOB_SIRET,
              VIS_DATE: this.state.VIS_DATE,
              VIS_OBSERVATIONS: this.state.VIS_OBSERVATIONS,
              VIS_MUTUALISEE: this.state.VIS_MUTUALISEE,
              VIS_CPMM: this.state.VIS_CPMM,
              trame: this.state.trame,
              AG_IDENT: this.props.agentIdent
            },
            this.state.controlesList
          )
          .then(() => {
            window.alert('La visite a bien été ajoutée.');
            this.props.history.push('/visite/' + ident);
          });
      }
    }
  }

  render() {
    return (
      <Container>
        {this.displayMessage(this.state.message)}
        <Grid style={{ margin: 'auto', textAlign: 'left' }} centered>
          <GridRow>
            <GridColumn width={14}>
              <Form onSubmit={this.onSubmit}>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Checkbox}
                    label="CPMM"
                    onClick={() =>
                      this.setState({ VIS_CPMM: !this.state.VIS_CPMM })
                    }
                    checked={this.state.VIS_CPMM}
                  />
                  <Form.Field
                    control={Checkbox}
                    label="Visite Mutualisée"
                    onClick={() =>
                      this.setState({
                        VIS_MUTUALISEE: !this.state.VIS_MUTUALISEE
                      })
                    }
                    checked={this.state.VIS_MUTUALISEE}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <DateInput
                    label="Date de la visite"
                    name="date"
                    placeholder="Date de la visite"
                    required
                    value={this.state.VIS_DATE}
                    iconPosition="right"
                    onChange={(event, { value }) =>
                      this.setState({ VIS_DATE: value })
                    }
                  />
                </Form.Group>
                <EntrepriseField
                  ETOB_SIRET={this.state.ETOB_SIRET}
                  ETOB_RAISON_SOCIALE={this.state.ETOB_RAISON_SOCIALE}
                  changeSiretValue={ETOB_SIRET => this.setState({ ETOB_SIRET })}
                  changeRaisonSocialeValue={ETOB_RAISON_SOCIALE =>
                    this.setState({ ETOB_RAISON_SOCIALE })
                  }
                  changeEtabIdentValue={ETOB_IDENT =>
                    this.setState({ ETOB_IDENT })
                  }
                />
                {this.displayTrame()}
                <Form.Group>
                  <Form.Field width={16}>
                    <TextArea
                      placeholder="Observations"
                      onChange={e =>
                        this.setState({ VIS_OBSERVATIONS: e.target.value })
                      }
                      value={this.state.VIS_OBSERVATIONS}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              <ControleComponent
                dossier={{
                  id: this.state.DOSSIER_IDENT,
                  text: this.state.dossierText
                }}
                controles={this.state.controlesList}
                changeControle={controlesList =>
                  this.setState({ controlesList })
                }
              />
              <Button style={{ marginTop: '20px' }} onClick={this.onSubmit}>
                Valider
              </Button>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}

CreateVisiteComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  agentIdent: PropTypes.number.isRequired,
  history: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      dossierId: PropTypes.string,
      visiteId: PropTypes.string
    })
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVisiteComponent);
