
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';

PouchDB.plugin(PouchDBFind);

class PouchNewVisitesService {
  constructor(AGENT_DD_IDENT) {
		this.initDb = this.initDb.bind(this);
		this.initDb(AGENT_DD_IDENT);
	}

	async initDb(AGENT_DD_IDENT) {

	
	}

	async resetDb() {
 
  }
}
	
export default PouchNewVisitesService