import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let activiteService = PouchDbServices.services.activite;
let cpfService = PouchDbServices.services.cpf;

// Champs permettant de rentrer les codes dans une création ou modification de visite

export default class CodesField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activites: [],
      cpf: []
    };
  }
  loadActivites(activites) {
    const newActivites = activites
      .filter(
        activite =>
          activite.ACDG_ENQUETE_FLAG === 1 &&
          !activite.ACDG_CODE_LIB_NIVEAU3.includes('[Obsolet]')
      )
      .map(activite => {
        return {
          key: activite.ACDG_IDENT,
          text: activite.ACDG_CODE_LIB_NIVEAU3,
          value: activite.ACDG_IDENT
        };
      });
    this.setState({ activites: newActivites });
  }
  loadCpf(cpf) {
    const newcpf = cpf
      .filter(codeCpf => !codeCpf.CPF_CODE_LIBELLE.includes('[Obsolet]'))
      .map(cpf => {
        return {
          key: cpf.CPF_IDENT,
          text: cpf.CPF_CODE_LIBELLE,
          value: cpf.CPF_IDENT
        };
      });
    this.setState({ cpf: newcpf });
  }

  componentDidMount() {
    activiteService.getAllDocs().then(res => this.loadActivites(res));
    cpfService.getAllDocs().then(res => this.loadCpf(res));
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field
          required
          lazyLoad
          control={Select}
          options={this.state.activites}
          label="Code DG"
          placeholder="Code DG"
          search
          defaultValue={this.props.ACDG_IDENT}
          onChange={this.props.activiteChange}
        />
        <Form.Field
          lazyLoad
          required
          control={Select}
          options={this.state.cpf}
          label="Code CPF"
          placeholder="Code CPF"
          search
          defaultValue={this.props.CPF_IDENT}
          onChange={this.props.cpfChange}
        />
      </Form.Group>
    );
  }
}

CodesField.propTypes = {
  activiteChange: PropTypes.func.isRequired,
  cpfChange: PropTypes.func.isRequired,
  ACDG_IDENT: PropTypes.number.isRequired,
  CPF_IDENT: PropTypes.number.isRequired
};
