import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DossierField from '../../components/fields/dossierField.component';
import StadeField from '../../components/fields/stadeField.component';
import CodesField from '../../components/fields/codes.component';

export default class SingleControleComponent extends React.Component {
  constructor(props) {
    super(props);
    if (props.controle) {
      this.state = {
        controle: {
          ...props.controle,
          DOSSIER_IDENT: props.controle.DOSSIER_IDENT,
          dossierText: props.controle.dossierText,
          TAPR_IDENT: props.controle.TAPR_IDENT,
          tacheText: props.controle.tacheText,
          ACDG_IDENT: props.controle.ACDG_IDENT,
          activiteText: props.controle.ACDG_CODE_LIB_NIVEAU3,
          CPF_IDENT: props.controle.CPF_IDENT,
          STADE_PRODUIT_IDENT: props.controle.STADE_PRODUIT_IDENT,
          ident: props.controle.ident
        }
      };
    } else {
      this.state = {
        controle: {
          DOSSIER_IDENT: parseInt(this.props.dossier.id),
          dossierText: this.props.dossier.text,
          TAPR_IDENT: 0,
          tacheText: '',
          ACDG_IDENT: 0,
          activiteText: '',
          CPF_IDENT: 0,
          STADE_PRODUIT_IDENT: -1
        }
      };
    }
  }

  render() {
    return (
      <Form>
        <DossierField
          dossierChange={(value, text) =>
            this.setState({
              controle: {
                ...this.state.controle,
                DOSSIER_IDENT: value,
                dossierText: text
              }
            })
          }
          tacheChange={(value, text) =>
            this.setState({
              controle: {
                ...this.state.controle,
                TAPR_IDENT: value,
                tacheText: text
              }
            })
          }
          DOSSIER_IDENT={this.state.controle.DOSSIER_IDENT}
          TAPR_IDENT={this.state.controle.TAPR_IDENT}
        />
        <CodesField
          activiteChange={(e, data) =>
            this.setState({
              controle: {
                ...this.state.controle,
                ACDG_IDENT: data.value,
                activiteText: e.currentTarget.innerText
              }
            })
          }
          cpfChange={(e, data) => {
            this.setState({
              controle: {
                ...this.state.controle,
                CPF_IDENT: data.value
              }
            });
          }}
          ACDG_IDENT={this.state.controle.ACDG_IDENT}
          CPF_IDENT={this.state.controle.CPF_IDENT}
        />
        <StadeField
          onChange={(e, data) =>
            this.setState({
              controle: {
                ...this.state.controle,
                STADE_PRODUIT_IDENT: data.value
              }
            })
          }
          STADE_PRODUIT_IDENT={this.state.controle.STADE_PRODUIT_IDENT}
        />
        <Form.Button onClick={() => this.props.onSubmit(this.state.controle)}>
          Valider
        </Form.Button>
      </Form>
    );
  }
}

SingleControleComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  dossier: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  }),
  controle: PropTypes.any
};
