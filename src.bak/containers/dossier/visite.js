import React, { Component, Fragment } from 'react';
import {
  Grid,
  Segment,
  Responsive,
  Icon,
  Header,
  Container
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MyLink from '../../components/visites/myLink.component';
import { DisplayAction } from './visiteActions';


export default class Visite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showControles: false
    }
  }

  render() {
    const { visite } = this.props;
    return (<Fragment style={{ margin: "0.5em" }}>
      <Grid.Row style={{ padding: 10, }}>
        <Segment
          style={{ width: '100%' }}
        // to={this.props.link}
        // icon
        // basic
        // fluid
        // className="menubutton"
        // color={this.props.color}
        // size="massive"
        >
          <Grid>
            <Grid.Row
              verticalAlign="middle"
              style={{
                padding: 0,
                backgroundColor: !visite.visiteData.new_visite && '#f2f2f2'
              }}
            >
              <Grid.Column
                width={3}
                onClick={() => this.setState({ showControles: !this.state.showControles })}
                style={{
                  backgroundColor: '#f2f2f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  cursor: 'pointer'
                }}
              >
                <Responsive minWidth={600}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {!visite.visiteData.new_visite && (
                      <Icon name="lock" color="grey" size="large"></Icon>
                    )}
                    <Icon name="search" color="grey" size="large"></Icon>
                    <div
                      style={{
                        borderRadius: '50%',

                        width: '20px',
                        height: '20px',

                        background: 'red',
                        color: 'white'
                      }}
                    >
                      {visite.controles.length}
                    </div>
                  </div>
                </Responsive>
                <Responsive maxWidth={599}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {!visite.visiteData.new_visite && (
                      <Icon
                        name="lock"
                        color="grey"
                        size="small"
                        style={{ fontSize: '1em' }}
                      ></Icon>
                    )}
                    <Icon
                      name="search"
                      color="grey"
                      size="small"
                      style={{ fontSize: '1em' }}
                    ></Icon>
                    <div
                      style={{
                        borderRadius: '50%',

                        width: '20px',
                        height: '20px',

                        background: 'red',
                        color: 'white'
                      }}
                    >
                      {visite.controles.length}
                    </div>
                  </div>
                </Responsive>
              </Grid.Column>
              <Grid.Column width={12}>
                <MyLink {...this.props} trames={this.props.trames} visite={visite}>
                  <Container>
                    <Grid verticalAlign='middle'>
                      <Grid.Column width={8} textAlign="left">
                        <Grid.Row>
                          <Header
                            as="h3"
                            style={{ color: 'grey', overflowWrap: 'break-word' }}
                          >
                            {visite.visiteData.ETOB_RAISON_SOCIALE}
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          <Header as="h6" style={{ fontWeight: 'normal' }}>
                            {visite.visiteData.VISITE_AGENT_LIBELLE}
                          </Header>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column width={7}>
                        <Grid.Row>
                          <Header as="h6" style={{ fontWeight: 'normal' }}>
                            {/* {this.props.dossier.ACDG_LIBELLE} */}
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          <Responsive minWidth={600}>
                            <Header as="h4" style={{ overflowWrap: 'break-word' }}>
                              {visite.visiteData.ETOB_ADR1}{' '}
                              {visite.visiteData.ETOB_ADR2}{' '}
                              {visite.visiteData.ETOB_ADR3} -{' '}
                              {visite.visiteData.ETOB_ADRVILLE}
                            </Header>
                          </Responsive>
                          <Responsive
                            maxWidth={600}
                            style={{ overflowWrap: 'break-word' }}
                          >
                            <Header as="h4">
                              {visite.visiteData.ETOB_ADR1}{' '}
                              {visite.visiteData.ETOB_ADR2}{' '}
                              {visite.visiteData.ETOB_ADR3} -{' '}
                              {visite.visiteData.ETOB_ADRVILLE}
                            </Header>
                          </Responsive>
                        </Grid.Row>
                        <Grid.Row>
                          <Header
                            as="h4"
                            style={{ fontWeight: 'normal', fontStyle: 'italic' }}
                          >
                            {moment(
                              visite.visiteData.VISITE_DATE_INTERVENTION
                            ).format('DD/MM/YYYY')}
                          </Header>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid>
                  </Container>
                </MyLink>
              </Grid.Column>

              {visite.visiteData.new_visite && (
                <Grid.Column
                  as={Link}
                  to={'/modify-visite/' + visite.visiteData.VISITE_IDENT}
                  width={1}
                  floated="right"
                >
                  <Icon name="pencil"></Icon>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Row>
      {this.state.showControles && <DisplayAction controles={visite.controles} />}
    </Fragment>
    );
  }
}

Visite.propTypes = {
  trames: PropTypes.array,
  visite: PropTypes.shape({
    visiteData: PropTypes.shape({
      ETOB_RAISON_SOCIALE: PropTypes.string,
      VISITE_DATE_INTERVENTION: PropTypes.string,
      ETOB_ADR1: PropTypes.string,
      ETOB_ADR2: PropTypes.string,
      ETOB_ADRVILLE: PropTypes.string
    })
  })
};
