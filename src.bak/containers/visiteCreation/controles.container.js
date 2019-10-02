import React from 'react';
import { Modal, Container, Button, Table, Message } from 'semantic-ui-react';
import SingleControleComponent from './singleControle.container';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let activiteService = PouchDbServices.services.activite;
let cpfService = PouchDbServices.services.cpf;

export default class ControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countControl: 1,
      addModalOpen: false,
      addModalErrorMessage: '',
      modifyModalOpen: false,
      modifyModalErrorMessage: '',
      controleModified: {}
    };
    this.submitAddControle = this.submitAddControle.bind(this);
    this.submitModifyControle = this.submitModifyControle.bind(this);
  }

  displayNoControleAlert = () => {
    if (this.props.controles.length === 0) {
      return (
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {"Aucun contrôle n'a été renseigné pour l'instant."}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    } else {
      return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Dossier</Table.HeaderCell>
            <Table.HeaderCell>Code Action</Table.HeaderCell>
            <Table.HeaderCell float="right"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      );
    }
  };

  async submitAddControle(controle) {
    if (
      !controle.DOSSIER_IDENT ||
      !controle.TAPR_IDENT ||
      !controle.ACDG_IDENT ||
      !controle.CPF_IDENT ||
      !controle.STADE_PRODUIT_IDENT
    ) {
      this.setState({
        addModalErrorMessage:
          'Veuillez renseigner tous les champs obligatoires.'
      });
    } else {
      controle.ident = this.state.countControl;
      const codeCPF = await cpfService.getCpfById(controle.CPF_IDENT);
      const codeActivite = await activiteService.getActiviteById(
        controle.ACDG_IDENT
      );
      this.setState({
        countControl: this.state.countControl + 1,
        addModalOpen: false,
        AddModalMessage: ''
      });
      this.props.changeControle(
        this.props.controles.concat([
          {
            ...controle,
            ...codeCPF,
            ...codeActivite,
            _id: undefined,
            _rev: undefined
          }
        ])
      );
    }
  }

  async submitModifyControle(controle, controleId) {
    if (
      !controle.DOSSIER_IDENT ||
      !controle.TAPR_IDENT ||
      !controle.ACDG_IDENT ||
      !controle.CPF_IDENT ||
      !controle.STADE_PRODUIT_IDENT
    ) {
      this.setState({
        modifyModalErrorMessage:
          'Veuillez renseigner tous les champs obligatoires.'
      });
    } else {
      const codeCPF = await cpfService.getCpfById(controle.CPF_IDENT);
      const codeActivite = await activiteService.getActiviteById(
        controle.ACDG_IDENT
      );
      this.setState({
        modifyModalOpen: false,
        modifyModalMessage: ''
      });
      this.props.changeControle(
        this.props.controles.map(cont => {
          if (cont.ident === controleId) {
            if (controle._id) {
              return {
                ...controle,
                ...codeCPF,
                ...codeActivite,
                _id: controle._id,
                _rev: controle._rev
              };
            } else {
              return { ...controle, ...codeCPF, ...codeActivite };
            }
          } else {
            return cont;
          }
        })
      );
    }
  }

  deleteControle = controleId => {
    this.props.changeControle(
      this.props.controles.map(cont =>
        cont.ident === controleId ? { ...cont, _deleted: true } : cont
      )
    );
  };

  displayMessage = message => {
    if (message) {
      return (
        <Message negative>
          <p>{message}</p>
        </Message>
      );
    }
  };
  render() {
    return (
      <Container>
        <p style={{ fontWeight: 'bold' }}>Actions de Contrôle :</p>
        <Modal
          trigger={
            <Button onClick={() => this.setState({ addModalOpen: true })}>
              Ajouter une action de contrôle
            </Button>
          }
          open={this.state.addModalOpen}
        >
          <Modal.Header>
            <span>Ajouter une action de contrôle</span>
            <Button
              floated="right"
              onClick={() => {
                this.setState({ addModalOpen: false });
              }}
            >
              Close
            </Button>
          </Modal.Header>
          <Modal.Content>
            {this.displayMessage(this.state.addModalErrorMessage)}
            <SingleControleComponent
              onSubmit={this.submitAddControle}
              dossier={this.props.dossier}
            />
          </Modal.Content>
        </Modal>
        <Modal open={this.state.modifyModalOpen}>
          <Modal.Header>
            <span>Modifier une action de contrôle</span>
            <Button
              floated="right"
              onClick={() => {
                this.setState({ modifyModalOpen: false });
              }}
            >
              Close
            </Button>
          </Modal.Header>
          <Modal.Content>
            {this.displayMessage(this.state.modifyModalErrorMessage)}
            <SingleControleComponent
              onSubmit={controle =>
                this.submitModifyControle(controle, controle.ident)
              }
              controle={this.state.controleModified}
              dossier={{
                id: this.state.controleModified.DOSSIER_IDENT,
                text: this.state.controleModified.dossierText
              }}
            />
          </Modal.Content>
        </Modal>
        <Table stackable>
          {this.displayNoControleAlert()}
          <Table.Body>
            {this.props.controles
              .filter(controle => controle._deleted !== true)
              .map(controle => (
                <Table.Row key={controle.ident}>
                  <Table.Cell>{controle.dossierText}</Table.Cell>
                  <Table.Cell>{controle.activiteText}</Table.Cell>
                  <Table.Cell width={3}>
                    <div style={{ height: '39px' }}>
                      <Button
                        floated="right"
                        color="red"
                        icon="trash alternate"
                        style={{ margin: '3px' }}
                        onClick={() => this.deleteControle(controle.ident)}
                      ></Button>
                      <Button
                        floated="right"
                        icon="pencil"
                        color="blue"
                        style={{ margin: '3px' }}
                        onClick={() =>
                          this.setState({
                            modifyModalOpen: true,
                            controleModified: controle
                          })
                        }
                      ></Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

ControleComponent.propTypes = {
  changeControle: PropTypes.func.isRequired,
  controles: PropTypes.array.isRequired,
  dossier: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
};
