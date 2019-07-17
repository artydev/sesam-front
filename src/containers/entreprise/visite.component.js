import React, { Component, Fragment } from 'react';
import { Grid, Segment, Responsive, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DisplayAction } from '../dossier/visiteActions';

export default class Visite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showControles: false
        }
    }
    render() {
        const { visite } = this.props;
        return (
            <Fragment style={{ margin: "0.5em" }}>
                <Grid.Row style={{ padding: 10, overflow: 'auto' }}>
                    <Segment
                        style={{ width: '100%' }}
                    >
                        <Grid>
                            <Grid.Row
                                verticalAlign="middle"
                                style={{
                                    padding: 0,
                                    //backgroundColor: !visite.visiteData.new_visite && 'grey'
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
                                        minHeight: '30px'
                                    }}
                                >
                                    <Responsive minWidth={600}>
                                        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
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
                                        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
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
                                <Grid.Column width={7} textAlign="left">
                                    <Header as="h3" style={{ fontWeight: 'normal' }}>
                                        {visite.VISITE_AGENT_LIBELLE}
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Header
                                        as="h3"
                                        style={{ fontWeight: 'normal', fontStyle: 'italic' }}
                                    >
                                        {moment(
                                            visite.VISITE_DATE_INTERVENTION
                                        ).format('DD/MM/YYYY')}
                                    </Header>
                                </Grid.Column>
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
