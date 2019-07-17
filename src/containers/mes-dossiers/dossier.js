import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Grid, Segment, Header, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './dossier.css';

class Dossier extends React.Component {
  render() {
    return (
      <Grid.Row style={{ padding: 10, overflow: 'auto' }}>
        <Segment
        // to={this.props.link}
        // icon
        // basic
        // fluid
        // className="menubutton"
        // color={this.props.color}
        // size="massive"
        >
          <Link to={this.props.link}>
            <Grid>
              <Grid.Row verticalAlign="middle" style={{ padding: 0 }}>
                <Grid.Column
                  width={3}
                  style={{
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <Responsive minWidth={600}>
                    <Icon
                      name={this.props.icon}
                      color={this.props.iconcolor}
                      size="huge"
                      style={{ marginTop: 5, marginBottom: 5 }}
                    ></Icon>
                  </Responsive>
                  <Responsive maxWidth={599}>
                    <Icon
                      name={this.props.icon}
                      color={this.props.iconcolor}
                      size="large"
                    ></Icon>
                  </Responsive>
                </Grid.Column>
                <Grid.Column width={7} textAlign="left">
                  <Grid.Row>
                    <Header as="h3">
                      {this.props.dossier.DOSSIER_LIBELLE}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h5">
                      {this.props.dossier.DOSSIER_OBJ_TRAVAIL}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row>
                    <Header as="h5" style={{ fontWeight: 'normal' }}>
                      {this.props.dossier.ACDG_LIBELLE}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h5">
                      {this.props.dossier.DOSSIER_ATTRIBUTAIRES}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h5">
                      {moment(this.props.dossier.DOSSIER_DATE_LIMITE).format(
                        'DD/MM/YYYY'
                      )}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Link>
        </Segment>
      </Grid.Row>
    );
  }
}

Dossier.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconcolor: PropTypes.string,
  dossier: PropTypes.object,
  type: PropTypes.string
};

export default Dossier;
