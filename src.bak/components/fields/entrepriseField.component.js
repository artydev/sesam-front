/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';

// Champs permettant de rentrer l'entreprise et le SIRET dans une création ou modification de visite
// En ligne, la recherche par raison sociale permet de rentrer automatiquement le SIRET et ajoute
// lui même le numéro identifiant de l'établissement, ce qui permet d'ajouter par la suite
// des informations sur l'établissement : l'adresse et le nom du responsable

export default class EntrepriseField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  async changeSearchResults(searchText) {
    try {
      let { data } = await axios.get(
        config.backend.base_url + '/entreprise/search?query=' + searchText
      );
      this.setState({
        searchResults: data.map(etab => ({
          key: etab.ETOB_SIRET,
          value: [etab.ETOB_SIRET, etab.ETOB_IDENT],
          text: etab.ETOB_RAISON_SOCIALE
        }))
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field
          fluid
          control={Select}
          search
          options={this.state.searchResults.concat([
            {
              key: this.props.ETOB_SIRET,
              value: [this.props.ETOB_SIRET, this.props.ETOB_IDENT],
              text: this.props.ETOB_RAISON_SOCIALE
            }
          ])}
          required
          label="Raison Sociale"
          placeholder="Rechercher"
          onSearchChange={(e, data) => {
            this.changeSearchResults(data.searchQuery);
            this.props.changeRaisonSocialeValue(data.searchQuery);
          }}
          onChange={(e, data) => {
            this.props.changeRaisonSocialeValue(e.currentTarget.innerText);
            this.props.changeSiretValue(data.value[0]);
            this.props.changeEtabIdentValue(data.value[1]);
          }}
          value={[this.props.ETOB_SIRET, this.props.ETOB_IDENT]}
        />
        <Form.Input
          fluid
          required
          label="SIRET"
          placeholder="SIRET"
          onChange={e => this.props.changeSiretValue(e.target.value)}
          value={this.props.ETOB_SIRET}
        />
      </Form.Group>
    );
  }
}

EntrepriseField.propTypes = {
  ETOB_RAISON_SOCIALE: PropTypes.string.isRequired,
  ETOB_SIRET: PropTypes.string.isRequired,
  ETOB_IDENT: PropTypes.string.isRequired,
  changeSiretValue: PropTypes.func.isRequired,
  changeRaisonSocialeValue: PropTypes.func.isRequired,
  changeEtabIdentValue: PropTypes.func.isRequired
};
