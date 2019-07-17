import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import { Tabs, Tab } from '@material-ui/core';
import './swipeable.css';
import DocumentsComponent from './documents.container';
import MyActivityIndicator from '../../components/myActivityIndicator.component';

import PouchDbServices from '../../services';
let dossierService = PouchDbServices.services.dossier;
let visiteService = PouchDbServices.services.visite;

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: () => dispatch(changeBackUrl('/mes-dossiers')),
    changeActivePage: value => dispatch(changeActivePage('mesDossiers', value))
  };
}

class MonDossier extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0,
      dossier: null,
      isLoading: true,
      visitesList: null
    };
  }

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };
  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };

  loadDossier(dossier) {
    this.setState({ dossier: dossier }, () => {
      this.state.dossier &&
        this.props.changeNameOfPage(this.state.dossier.DOSSIER_LIBELLE);
    });
  }

  componentDidMount() {
    let dossierId = this.props.match.params.id;
    visiteService
      .getVisitesByDossier(dossierId)
      .then(data => this.setState({ visitesList: data, isLoading: false }));
    visiteService.onChanges(() =>
      this.setState({ isLoading: true }, () => {
        visiteService.getVisitesByDossier(dossierId).then(data => {
          this.setState({ visitesList: data, isLoading: false });
        });
      })
    );

    this.props.changeNameOfPage('Dossier ' + this.props.match.params.id);
    this.props.changeBackUrl();
    this.props.changeActivePage('/dossier/' + this.props.match.params.id);
    dossierService
      .getDossierById(this.props.match.params.id)
      .then(res => this.loadDossier(res));
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        {this.state.dossier ? (
          <Container
            style={{
              overflow: 'hidden',
              height: '100%',
              width: '100%'
            }}
          >
            <Grid
              centered
              style={{
                height: '100%',

                flex: 1,
                flexDirection: 'column',
                flexWrap: 'nowrap',
                overflow: 'hidden'
              }}
            >
              <Grid.Row style={{ flex: 1 }}>
                <Tabs
                  value={this.state.activeIndex}
                  fullWidth
                  onChange={this.handleChange}
                >
                  <Tab label="Infos" />
                  {//pas de visites si le dossier n'est pas de type enquête!
                  this.state.dossier.TYPE_DOSSIER_IDENT === 3 && (
                    <Tab label="Visites" />
                  )}
                  <Tab label="Documents" />
                </Tabs>
              </Grid.Row>
              <Container
                style={{ flex: 10, overflow: 'hidden' }}
                className="hidescrollbar responsivecontainer"
              >
                {this.state.dossier.TYPE_DOSSIER_IDENT === 3 ? (
                  <SwipeableViews
                    style={{ height: '100%' }}
                    slideStyle={{ height: '100%', overflow: 'auto' }}
                    slideClassName="hidescrollbar"
                    index={this.state.activeIndex}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <InfosComponent dossier={this.state.dossier} />

                    <VisitesComponent
                      visitesList={this.state.visitesList}
                      dossierid={this.state.dossier.DOSSIER_IDENT}
                      {...this.props}
                    />

                    <DocumentsComponent
                      visitesList={this.state.visitesList}
                      dossierid={this.state.dossier.DOSSIER_IDENT}
                      {...this.props}
                    />
                  </SwipeableViews>
                ) : (
                  <SwipeableViews
                    style={{ height: '100%' }}
                    slideStyle={{ height: '100%', overflow: 'auto' }}
                    slideClassName="hidescrollbar"
                    index={this.state.activeIndex}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <InfosComponent dossier={this.state.dossier} />
                    <DocumentsComponent
                      {...this.props}
                      visitesList={this.state.visitesList}
                      dossierid={this.state.dossier.DOSSIER_IDENT}
                    />
                  </SwipeableViews>
                )}
              </Container>
            </Grid>
          </Container>
        ) : (
          <MyActivityIndicator />
          // <DocumentsComponent {...this.props} />
        )}
      </div>
    );
  }
}

MonDossier.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonDossier);
