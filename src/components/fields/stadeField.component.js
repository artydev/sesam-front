import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'semantic-ui-react';
import { stades } from './stades.data';

// Champs permettant d'ajouter le stade dans l'ajout ou la modification de visite, dans le modal controle

export default class StadeField extends React.Component {
  render() {
    return (
      <Form.Field
        required
        control={Select}
        options={stades}
        label="Stade"
        placeholder="Stade"
        search
        defaultValue={this.props.STADE_PRODUIT_IDENT}
        onChange={this.props.onChange}
      />
    );
  }
}

StadeField.propTypes = {
  onChange: PropTypes.func.isRequired,
  STADE_PRODUIT_IDENT: PropTypes.number.isRequired
};
