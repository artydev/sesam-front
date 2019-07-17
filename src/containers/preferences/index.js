import React, { Component } from 'react';
import { Container, Grid, Button, Icon, List, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import PouchDBServices from '../../services/index';
import MyActivityIndicator from '../../components/myActivityIndicator.component';
export default class Preferences extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      trames: [],
      isLoading: true,
      trameSelected: null
    };
  }

  selectTrame(trame) {
    this.setState({ trameSelected: trame });
  }

  componentDidMount() {
    PouchDBServices.services.trame
      .getAllDocs()
      .then(res => {
        this.setState({ trames: res, isLoading: false });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <Container style={{ width: '100%', height: '100%' }}>
        {!this.state.isLoading ? (
          <Grid
            style={{ height: '100%' }}
            verticalAlign="middle"
            columns="equal"
          >
            <Grid.Row>
              <Grid.Column></Grid.Column>
              <Grid.Column computer={6} tablet={8} mobile={16}>
                <Grid.Row style={{ padding: '20px' }}>
                  <Button
                    as={Link}
                    to={'/authentification'}
                    icon
                    fluid
                    color="red"
                    size="massive"
                    labelPosition="left"
                  >
                    <Icon name="log out" />
                    Se déconnecter
                  </Button>
                </Grid.Row>
                <Grid.Row style={{ padding: '20px' }}>
                  <Button
                    as={Link}
                    to={'/nouvelle-trame'}
                    icon
                    fluid
                    color="teal"
                    size="massive"
                    labelPosition="left"
                  >
                    <Icon name="add" />
                    Créer un modèle de trame
                  </Button>
                </Grid.Row>
                <Grid.Row style={{ padding: '20px' }}>
                  <Button
                    as={Link}
                    to={
                      this.state.trameSelected &&
                      '/nouvelle-trame/' + this.state.trameSelected._id
                    }
                    icon
                    disabled={!this.state.trameSelected}
                    fluid
                    color="blue"
                    size="massive"
                    labelPosition="left"
                  >
                    <Icon name="edit" />
                    Editer un modèle de trame
                  </Button>
                  <List
                    divided
                    relaxed
                    verticalAlign="middle"
                    style={{
                      border: '1px solid #2185d0',
                      borderTop: 0,
                      marginTop: 0,
                      maxHeight: 200,
                      overflow: 'auto',
                      borderBottomLeftRadius: 3,
                      borderBottomRightRadius: 3
                    }}
                  >
                    {this.state.trames.map((trame, i) => (
                      <List.Item
                        onClick={() => this.selectTrame(trame)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          padding: 15,
                          backgroundColor:
                            this.state.trameSelected === trame && 'white'
                        }}
                        key={i}
                      >
                        <Header as="h5">{trame.name}</Header>
                      </List.Item>
                    ))}
                  </List>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <MyActivityIndicator />
        )}
      </Container>
    );
  }
}
