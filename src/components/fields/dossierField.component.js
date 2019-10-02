import React from 'react';
import { Form, Select, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let dossierService = PouchDbServices.services.dossier;

// Champs permettant de rentrer un dossier et une tache nationale dans une création ou modification de visite

export default class DossierField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: [],
      taches: [],
      allTaches: [],
      tabDossiersTaches: [],
      optionsDossiers: []
    };
  }

  componentDidMount() {
    dossierService.getAllDocs().then(res => this.loadDossiers(res));
  }

  loadDossiers = dossiers => {
    var tabDossiersTaches = [];
    dossiers.forEach(dossier => {
      for (var i = 0; i < dossier.TAPR_LIBELLE.length; i += 1) {
        if (
          dossier.TAPR_LIBELLE[i] !== '[*]Non défini' &&
          tabDossiersTaches.filter(
            corres =>
              corres.dossierId === dossier.DOSSIER_IDENT &&
              corres.tacheId === dossier.TAPR_IDENT[i]
          ).length === 0
        ) {
          tabDossiersTaches = tabDossiersTaches.concat([
            {
              dossierId: dossier.DOSSIER_IDENT,
              dossierText: dossier.DOSSIER_LIBELLE,
              tacheId: dossier.TAPR_IDENT[i],
              tacheText: dossier.TAPR_LIBELLE[i] + dossier.TAPR_LIBELLE_COURT[i]
            }
          ]);
        }
        if (
          tabDossiersTaches.filter(
            corres => corres.dossierId === dossier.DOSSIER_IDENT
          ).length === 0
        ) {
          tabDossiersTaches = tabDossiersTaches.concat([
            {
              dossierId: dossier.DOSSIER_IDENT,
              dossierText: dossier.DOSSIER_LIBELLE,
              tacheId: -1,
              tacheText: 'Aucune'
            }
          ]);
        }
      }
    });
    this.setState(
      {
        tabDossiersTaches: tabDossiersTaches,
        allTaches: tabDossiersTaches
          .map(corres => ({
            key: corres.tacheId,
            text: corres.tacheText,
            value: corres.tacheId
          }))
          .filter(value => value.key !== -1)
      },
      () => this.handleDossierChange(this.props.DOSSIER_IDENT)
    );

    var newDossiers = dossiers
      .filter(dossier => !(dossier.TYPE_DOSSIER_LIBELLE === 'Information'))
      .map(dossier => {
        return {
          key: dossier.DOSSIER_IDENT,
          text: dossier.DOSSIER_LIBELLE,
          value: dossier.DOSSIER_IDENT
        };
      });
    this.setState({ dossiers: newDossiers, optionsDossiers: newDossiers });
  };

  handleDossierChange = codeDossier => {
    if (codeDossier === -1) {
      this.setState({ taches: this.state.allTaches }, () =>
        this.props.tacheChange(
          this.state.taches[0].key,
          this.state.taches[0].text
        )
      );
    } else {
      this.setState(
        {
          taches: this.state.tabDossiersTaches
            .filter(corres => corres.dossierId === codeDossier)
            .map(corres => ({
              key: corres.tacheId,
              text: corres.tacheText,
              value: corres.tacheId
            }))
        },
        () =>
          this.props.tacheChange(
            this.state.taches[0].key,
            this.state.taches[0].text
          )
      );
    }
  };

  handleTacheChange = dossierSelected => {
    this.setState({
      optionsDossiers: this.optionsDossierField(dossierSelected)
    });
  };

  optionsDossierField = dossierSelected => {
    if (this.props.TAPR_IDENT === 0) {
      return this.state.dossiers;
    }
    if (dossierSelected === -1) {
      return this.state.tabDossiersTaches
        .filter(corres => corres.tacheId === this.props.TAPR_IDENT)
        .map(corres => ({
          key: corres.dossierId,
          value: corres.dossierId,
          text: corres.dossierText
        }));
    } else {
      return this.state.dossiers;
    }
  };

	/* Remplacement de l'élément 'Select' par l'élémént Input */
	getLibSelectedDossier = (dossierIdent) => {		
		const listDossier = this.state.optionsDossiers;
		const selectedDossier = listDossier.filter(dossier => dossier.key == dossierIdent)[0];
		return (selectedDossier &&  selectedDossier.text) || "veuillez patienter, merci";
	}

	getTacheProgrammee = () => {
		if (this.state.taches.length > 0) {
			const listTache = this.state.taches
			return listTache[0].text || "veuillez patienter, merci"
		}
	}	

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field
          required
          control={Input}
        
          label="Dossier"
         
					value={this.getLibSelectedDossier(this.props.DOSSIER_IDENT)}
        />

        <Form.Field
          required
          control={Input}
          label="Tâche Programmée"
          value={this.getTacheProgrammee()}
        />
      </Form.Group>
    );
  }
}

DossierField.propTypes = {
  dossierChange: PropTypes.func.isRequired,
  tacheChange: PropTypes.func.isRequired,
  DOSSIER_IDENT: PropTypes.number.isRequired,
  TAPR_IDENT: PropTypes.number.isRequired
};
