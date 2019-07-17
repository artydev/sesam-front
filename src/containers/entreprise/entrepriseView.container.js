import React from 'react';
import { Card, Grid, Container } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';
import VisiteComponent from './visite.component';
import MyActivityIndicator from '../../components/myActivityIndicator.component';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import config from '../../config';
import axios from 'axios';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl)),
    changeActivePage: value =>
      dispatch(changeActivePage('etablissements', value))
  };
}

class EntrepriseViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visites: []
    }
  }

  componentDidMount() {
    this.props.changeBackUrl('/etablissements');
    this.setState({ isLoading: true });
    axios.get(config.backend.base_url + '/entreprise/' + this.props.match.params.id)
      .then(({ data }) => {
        this.setState(data);
        this.props.changeNameOfPage('Établissement ' + data.ETOB_ENSEIGNE_LIB);
        this.props.changeActivePage('/etablissement/' + data.ETOB_IDENT);
        this.setState({ isLoading: false });
      })
  }
  componentDidUpdate(prevprops) {
    if (prevprops.match.params.id != this.props.match.params.id) {
      this.setState({ isLoading: true });

      axios.get(config.backend.base_url + '/entreprise/' + this.props.match.params.id)
        .then(({ data }) => {
          this.setState(data);
          this.props.changeNameOfPage('Établissement ' + data.ETOB_ENSEIGNE_LIB);
          this.props.changeActivePage('/etablissement/' + data.ETOB_IDENT);
          this.setState({ isLoading: false });
        })
    }
  }

  render() {
    if (this.state.isLoading)
      return <MyActivityIndicator />
    return (
      <Container style={{ padding: '1rem' }}>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">Informations</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid>
              <EntrepriseAttribute
                name="Enseigne :"
                icon="building"
                value={<span>{this.state.ETOB_ENSEIGNE_LIB}</span>}
              />

              <EntrepriseAttribute
                name="Raison Sociale :"
                icon="address card"
                value={<span>{this.state.ETOB_RAISON_SOCIALE}</span>}
              />
              <EntrepriseAttribute
                name="SIRET :"
                icon="text cursor"
                value={<span>{this.state.ETOB_SIRET}</span>}
              />
              <EntrepriseAttribute
                name="NAF :"
                icon="clipboard"
                value={<span>{this.state.NAF_LIBELLE}</span>}
              />
              <EntrepriseAttribute
                name="Adresse :"
                icon="address book"
                value={
                  <span>
                    {this.state.ETOB_ADR1} <br />
                    {this.state.ETOB_ADR2 && <span>{this.state.ETOB_ADR2} <br /></span>}
                    {this.state.ETOB_ADR3 && <span>{this.state.ETOB_ADR3} <br /></span>}
                    {this.state.ETOB_ADRCP}
                    <span> </span>
                    {this.state.ETOB_ADRVILLE}
                  </span>
                }
              />
            </Grid>
          </Card.Content>
        </Card>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">Visites</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid>
              {this.state.visites.map(visite => <VisiteComponent key={visite.VISITE_IDENT} visite={visite} />)}
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

EntrepriseViewComponent.propTypes = {
  location: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired,
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntrepriseViewComponent);
