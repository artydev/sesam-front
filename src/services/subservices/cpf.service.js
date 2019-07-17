import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';
import replicateFromSQL from '../replicationHandler';

PouchDB.plugin(PouchDBFind);
class CpfService {
  constructor() {
    let pouchDbUrl = config.couchDb.url_cpf;
    this.db = new PouchDB('cpf');
    var opts = {
      batch_size: 1000,
      live: true,
      retry: true
    };
    this.replication = replicateFromSQL(
      this.db,
      config.backend.base_url + '/fulldata/cpf/',
      'cpf_date'
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

  getCpfById(codeCPF) {
    return this.db
      .find({
        selector: {
          CPF_IDENT: parseInt(codeCPF)
        }
      })
      .then(res => res.docs[0]);
  }
}

export default CpfService;
