import DossierService from './subservices/dossier.service';
import VisiteService from './subservices/visite.service';
import ActiviteService from './subservices/activite.service';
import CpfService from './subservices/cpf.service';
import DocumentsService from './subservices/documents.service';

import TrameService from './subservices/trame.service';

class PouchDbServices {
  constructor() {
    this.AGENT_DD_IDENT = window.localStorage.getItem('AGENT_DD_IDENT');
    this.services = {
      dossier: new DossierService(this.AGENT_DD_IDENT),
      visite: new VisiteService(this.AGENT_DD_IDENT),
      activite: new ActiviteService(),
      trame: new TrameService(),
      cpf: new CpfService(),
      documents: new DocumentsService(this.AGENT_DD_IDENT)
    };
    this.ChangeAgent = this.ChangeAgent.bind(this);
  }

  async ChangeAgent(AGENT_DD_IDENT) {
    this.AGENT_DD_IDENT = AGENT_DD_IDENT;
    window.localStorage.setItem('AGENT_DD_IDENT', AGENT_DD_IDENT);
    await Promise.all(Object.keys(this.services).map(async key => {
      await this.services[key].resetDb(AGENT_DD_IDENT);
    }));
  }
}

export default new PouchDbServices();
