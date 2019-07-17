import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Grid, Icon, Popup } from 'semantic-ui-react';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';

import moment from 'moment';

class InfosComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dossier } = this.props;
    return dossier ? (
      <Container style={{ padding: 5 }}>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">
              Dossier {dossier.DOSSIER_LIBELLE}
            </Card.Header>
            <Card.Meta textAlign="center">
              {dossier.TYPE_DOSSIER_IDENT === 3 ? (
                <Popup
                  content="Ce dossier est de type enquête."
                  position="bottom center"
                  trigger={
                    <Icon
                      circular
                      inverted
                      name="search"
                      color="grey"
                      style={{ marginRight: 10 }}
                    ></Icon>
                  }
                />
              ) : dossier.TYPE_DOSSIER_IDENT === 2 ? (
                <Popup
                  content="Ce dossier est de type information."
                  position="bottom center"
                  trigger={
                    <Icon
                      circular
                      inverted
                      name="info"
                      color="grey"
                      style={{ marginRight: 10 }}
                    ></Icon>
                  }
                />
              ) : (
                <Popup
                  content="Ce dossier est de type autres."
                  position="bottom center"
                  trigger={
                    <Icon
                      circular
                      inverted
                      name="plus"
                      color="grey"
                      style={{ marginRight: 10 }}
                    ></Icon>
                  }
                />
              )}
              {dossier.TYPE_ENQUETE_IDENT === 3 ? (
                <Popup
                  content="Ce dossier fait partie d'un programme national."
                  position="bottom center"
                  trigger={
                    <Icon
                      circular
                      inverted
                      name="flag"
                      color="grey"
                      style={{ marginLeft: 10 }}
                    ></Icon>
                  }
                />
              ) : (
                <Popup
                  content="Autre enquête."
                  position="bottom center"
                  trigger={
                    <Icon
                      circular
                      inverted
                      name="ellipsis horizontal"
                      color="grey"
                      style={{ marginLeft: 10 }}
                    ></Icon>
                  }
                />
              )}
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <Grid>
              <EntrepriseAttribute
                name="OBJET :"
                icon="search"
                value={<span>{dossier.DOSSIER_OBJ_TRAVAIL}</span>}
              />

              <EntrepriseAttribute
                name="OBSERVATIONS :"
                icon="plus"
                value={<span>{dossier.DOSSIER_OBS}</span>}
              />

              <EntrepriseAttribute
                name="ACDG :"
                icon="file"
                value={
                  <span>
                    {' '}
                    {dossier.ACDG_CODE_ACTION} - {dossier.ACDG_LIBELLE}
                  </span>
                }
              />

              <EntrepriseAttribute
                name="RESPONSABLE :"
                icon="user"
                value={<span>{dossier.DOSSIER_RESPONSABLE_LIBELLE}</span>}
              />

              <EntrepriseAttribute
                name="ATTRIBUTAIRES :"
                icon="users"
                value={<span>{dossier.DOSSIER_ATTRIBUTAIRES}</span>}
              />

              <EntrepriseAttribute
                name="DATE CLOTURE :"
                icon="lock"
                value={
                  <span>
                    {moment(dossier.DOSSIER_DATE_CLOTURE).format('DD/MM/YYYY')}
                  </span>
                }
              />

              <EntrepriseAttribute
                name="DATE LIMITE :"
                icon="clock"
                value={
                  <span>
                    {moment(dossier.DOSSIER_DATE_LIMITE).format('DD/MM/YYYY')}
                  </span>
                }
              />
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    ) : (
      <div></div>
    );
  }
}

InfosComponent.propTypes = {
  dossier: PropTypes.shape({
    DOSSIER_OBJ_TRAVAIL: PropTypes.string,
    DOSSIER_RESPONSABLE_LIBELLE: PropTypes.string,
    DOSSIER_ATTRIBUTAIRES: PropTypes.string
  })
};

export default InfosComponent;
