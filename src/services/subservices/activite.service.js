import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';
import replicateFromSQL from '../replicationHandler';

PouchDB.plugin(PouchDBFind);
class ActiviteService {
  constructor() {
    let pouchDbUrl = config.couchDb.url_activite;
    this.db = new PouchDB('activite');
    var opts = {
      batch_size: 1000,
      live: true,
      retry: true
    };

    this.replication = replicateFromSQL(
      this.db,
      config.backend.base_url + '/fulldata/activite/',
      'activite_date'
    );
    this.resetDb = () => undefined; // no need to reset activite
  }

  //getAllDocsOfTheDB
  getAllDocs() {
    return this.db
      .allDocs({ include_docs: true, descending: true })
      .then(table =>
        table.rows
          .map(item => item.doc)
          .filter(item => !(item._id.split('/')[0] == '_design'))
      );
  }
  getActiviteById(codeActivite) {
    return this.db
      .find({
        selector: {
          ACDG_IDENT: parseInt(codeActivite)
        }
      })
      .then(res => res.docs[0]);
  }
}

export default ActiviteService;
