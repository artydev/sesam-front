import React from 'react';
import Menu from './containers/menu';
import Dossiers from './containers/mes-dossiers';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import MonDossier from './containers/dossier';
import CreateVisite from './containers/visiteCreation/createVisite.container';
import CreateTrame from './containers/preferences/trame/trameCreation.container';
import MaVisite from './containers/visite';
import EntrepriseView from './containers/entreprise';
import EntrepriseViewComponent from './containers/entreprise/entrepriseView.container';
import AuthComponent from './containers/auth/auth.container';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Preferences from './containers/preferences';
import FormTest from './containers/forms/conso/FormTest';

function mapStateToProps(state) {
  return {
    AGENT_DD_IDENT: state.dataReducer.AGENT_DD_IDENT
  };
}

let RoutingComponent = props =>
  !props.AGENT_DD_IDENT ? (
    <AuthComponent />
  ) : (
    <Switch>
      <Route exact path="/etablissements" component={EntrepriseView} />
      <Route
        exact
        path="/etablissement/:id"
        component={EntrepriseViewComponent}
      />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/preferences" component={Preferences} />
      <Route exact path="/mes-dossiers" component={Dossiers} />
      <Route exact path="/dossier/:id" component={MonDossier} />
      <Route exact path="/visite/:id" component={MaVisite} />
      <Route exact path="/nouvelle-trame/:id" component={CreateTrame} />
      <Route
        exact
        path="/nouvelle-visite/:dossierId"
        component={CreateVisite}
      />
      <Route exact path="/modify-visite/:visiteId" component={CreateVisite} />
      <Route exact path="/nouvelle-trame" component={CreateTrame} />
      <Route exact path="/authentification" component={AuthComponent} />
      <Route exact path="/form-test" component={FormTest} />

      <Route render={() => <Redirect to="/menu" />} />
    </Switch>
  );

RoutingComponent.propTypes = {
  AGENT_DD_IDENT: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(RoutingComponent);
