/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import _ from 'lodash';
import { Grid, Search, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import config from '../../config';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import './entreprise.css';

const initialState = { isLoading: false, results: [], value: '' };

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: () => dispatch(changeNameOfPage('Établissements')),
    changeBackUrl: () => dispatch(changeBackUrl('/menu')),
    changeActivePage: () =>
      dispatch(changeActivePage('etablissements', '/etablissements'))
  };
}

class EntrepriseSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };
  }

  componentDidMount() {
    this.props.changeNameOfPage();
    this.props.changeBackUrl();
    this.props.changeActivePage();
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      if (this.state.value.length < 1) return this.setState(initialState);
      let { data } = await axios.get(
        config.backend.base_url + '/entreprise/search?query=' + this.state.value
      );
      this.setState({
        isLoading: false,
        results: data
      });
    }, 300);
  };
  renderResults({
    ETOB_IDENT,
    ETOB_RAISON_SOCIALE,
    ETOB_ENSEIGNE_LIB,
    ETOB_SIRET
  }) {
    return (
      <Container
        fluid
        as={Link}
        to={'/etablissement/' + ETOB_IDENT}
        style={{ color: 'black', padding: '1em' }}
      >
        <Grid>
          <Grid.Row style={{ padding: '0.2em' }}>
            <Header as="h3">{ETOB_ENSEIGNE_LIB || ETOB_RAISON_SOCIALE}</Header>
          </Grid.Row>
          <Grid.Row style={{ padding: 0 }}>
            <Grid.Column style={{ fontWeight: 'bold' }} width={5}>
              Enseigne :{' '}
            </Grid.Column>
            <Grid.Column width={10}>{ETOB_ENSEIGNE_LIB}</Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: 0 }}>
            <Grid.Column style={{ fontWeight: 'bold' }} width={5}>
              Raison Sociale :{' '}
            </Grid.Column>
            <Grid.Column width={10}>{ETOB_RAISON_SOCIALE}</Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: 0 }}>
            <Grid.Column style={{ fontWeight: 'bold' }} width={5}>
              Siret :{' '}
            </Grid.Column>
            <Grid.Column width={10}>{ETOB_SIRET}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Container style={{ height: '90%' }}>
        <Grid style={{ height: '100%', marginTop: '1rem' }}>
          <Grid.Column tablet={11} mobile={16} computer={16} textAlign="center">
            <Search
              fluid
              noResultsMessage="Aucun résultat."
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 10000, {
                leading: true
              })}
              results={results}
              value={value}
              resultRenderer={this.renderResults}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
EntrepriseSearch.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntrepriseSearch);
