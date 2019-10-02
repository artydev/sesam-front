import React from 'react';
import { Container, Grid, Card, Divider } from 'semantic-ui-react';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';


export function DisplayAction({ controles }) {
    return (
        <Container style={{ padding: '1rem', paddingTop: 0 }}>
            <Card centered raised fluid >
                <Card.Content>
                    {controles.map((controle, index) => {
                        return <React.Fragment key={controle.CONTROLE_IDENT}>
                            <Grid  >
                                <EntrepriseAttribute
                                    name="Action :"
                                    icon="thumbtack"
                                    style={{ padding: "0.6em" }}
                                    value={<span>{controle.ACDG_CODE_ACTION}{controle.ACDG_LIBELLE}</span>}
                                />
                                <EntrepriseAttribute
                                    name="Produit :"
                                    icon="cube"
                                    style={{ padding: "0.6em" }}
                                    value={<span>{controle.CPF_CODE_PRODUIT} {controle.CPF_LIBELLE}</span>}
                                />

                            </Grid>
                            {index !== (controles.length - 1) && <Divider />}
                        </React.Fragment>


                    })}
                </Card.Content>
            </Card>
        </Container>
    )
}