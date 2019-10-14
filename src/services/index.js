import DossierService from './subservices/dossier.service';
import VisiteService from './subservices/visite.service';
import ActiviteService from './subservices/activite.service';
import CpfService from './subservices/cpf.service';
import DocumentsService from './subservices/documents.service';
import TrameService from './subservices/trame.service';
import NewVisitesService from './subservices/newvisites.service'


class PouchDbServices {
  constructor() {
		window.console.log("\n\n---------------Init Pouch Services (sercices/subservices/index.js)-------\n\n")
		this.AGENT_DD_IDENT = window.localStorage.getItem('AGENT_DD_IDENT');
    this.services = {
      dossier: new DossierService(this.AGENT_DD_IDENT),
      visite: new VisiteService(this.AGENT_DD_IDENT),
      activite: new ActiviteService(),
      trame: new TrameService(),
      cpf: new CpfService(),
			documents: new DocumentsService(this.AGENT_DD_IDENT),
			newVisites: new NewVisitesService()
    };
		this.ChangeAgent = this.ChangeAgent.bind(this);
  }

	// from auth.container.js
	// await PouchDBServices.ChangeAgent(newAgentIdent);
  async ChangeAgent(AGENT_DD_IDENT) {
		this.AGENT_DD_IDENT = AGENT_DD_IDENT;	
    window.localStorage.setItem('AGENT_DD_IDENT', AGENT_DD_IDENT);
    await Promise.all(Object.keys(this.services).map(async key => {
      await this.services[key].resetDb(AGENT_DD_IDENT);
    }));
  }
}

export default new PouchDbServices();
