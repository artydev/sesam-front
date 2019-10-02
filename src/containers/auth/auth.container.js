import React from 'react';
import {
  Button,
  Container,
  Card,
  Form,
  Input,
  Grid,
  GridColumn,
  Label,
  Header,
  GridRow
} from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { changeAgent } from '../../services/actions';
import { FormGroup } from '@material-ui/core';
import axios from 'axios';
import config from '../../config';
import PouchDBServices from '../../services';
import MyActivityIndicator from '../../components/myActivityIndicator.component';

function mapStateToProps(state) {
  return {
    AGENT_DD_IDENT: state.dataReducer.AGENT_DD_IDENT
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAgent: async newAgentIdent => {
			alert(newAgentIdent)
      await PouchDBServices.ChangeAgent(newAgentIdent);
      dispatch(changeAgent(newAgentIdent));
    }
  };
}

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idAgent: '',
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => { 

    try {
      let res = await axios.get(
				config.backend.base_url + '/agent/' + this.state.idAgent);
				window.console.clear()
				window.console.log("Searching user...")
				window.console.log(res)
    
      if (
        window.confirm(
          "Etes vous sur de vouloir changer d'utilisateur pour " +
            res.data.AGENT_DD_LIBELLE +
            '.\n Vous perdrez toutes les données actuelles pour télécharger les données du nouvel utilisateur.'
        )
      ) {
				this.setState({ isLoading: true });
				
				await this.props.changeAgent(res.data.AGENT_DD_IDENT);
				// Appel à PouchDB
        if (
          this.props.location &&
          this.props.location.pathname == '/authentification'
        ) {
					window.console.log("Recherche des dossiers....")
          this.props.history.push('/mes-dossiers');
        }
        this.setState({ isLoading: true });
      }
    } catch (err) {
      if (!err.response && err.request) {
        window.alert(
          "Vous devez être connecté à internet pour changer d'utilisateur.\nVérifier votre connection avant de réeesayer"
        );
      } else if (err.response && err.response.status == 404) {
        window.alert(
          "L'utilisateur avec l'identifiant " +
            this.state.idAgent +
            ' est introuvable'
        );
      } else if (!err.response) {
        window.alert("Une erreur locale s'est produite.");
      } else {
        window.alert(err.response.status + " Vérifier que rien ne s' execute sur le port 8080");
      }
    }
  };

  render() {
    if (this.state.isLoading) return <MyActivityIndicator />;
    return (
      <Container style={{ width: '100%', height: '100%' }}>
        <Grid
          style={{ width: '100%', height: '100%' }}
          verticalAlign="middle"
          centered
        >
          <GridRow>
            <GridColumn width={10} centered>
              <Form
                onSubmit={this.onSubmit}
                style={{
                  minWidth: '300px',
                  textAlign: 'center',
                  paddingBottom: '10em'
                }}
              >
                {/* <Header as="h1">Changer d'utilisateur</Header> */}

                <FormGroup style={{ width: '100%', paddingBottom: '1.5em' }}>
                  <Header
                    as="h3"
                    style={{
                      textAlign: 'left',
                      marginBottom: '0',
                      marginLeft: '0.3em'
                    }}
                  >
                    Identifiant agent{' '}
                  </Header>
                  <Input
                    value={this.state.idAgent}
                    size="big"
                    placeholder="Identifiant du nouvel utilisateur"
                    style={{ width: '100%' }}
                    onChange={(event, { value }) =>
                      this.setState({ idAgent: value })
                    }
                  />
                </FormGroup>

                <FormGroup style={{ width: '100%', textAlign: 'center' }}>
                  <Button
                    size="big"
                    style={{ color: 'white', backgroundColor: '#00b5ad' }}
                  >
                    {' '}
                    Valider{' '}
                  </Button>
                </FormGroup>
              </Form>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}

AuthComponent.propTypes = {
  changeAgent: PropTypes.func.isRequired,
  location: PropTypes.any,
  history: PropTypes.any
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
