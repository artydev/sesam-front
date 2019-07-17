/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';

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
          value: etab.ETOB_SIRET,
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
              value: this.props.ETOB_SIRET,
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
            this.props.changeSiretValue(data.value);
          }}
          value={this.props.ETOB_SIRET}
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
  changeSiretValue: PropTypes.func.isRequired,
  changeRaisonSocialeValue: PropTypes.func.isRequired
};
