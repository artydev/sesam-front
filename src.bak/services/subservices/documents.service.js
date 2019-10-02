/* eslint-disable no-undef */
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';
PouchDB.plugin(PouchDBFind);

class pouchDbDocumentsService {
  constructor(AGENT_DD_IDENT) {
    this.changesCallbacks = [];
    this.initDb(AGENT_DD_IDENT);
  }

  async initDb(AGENT_DD_IDENT) {
    this.AGENT_DD_IDENT = AGENT_DD_IDENT;
    this.documentsDB = new PouchDB('documents');
    var opts = {
      live: true,
      retry: true,
      filter: 'filters/by_user',
      query_params: { AGENT_DD_IDENT: AGENT_DD_IDENT }
    };

    this.documentsDB.replicate.to(config.couchDb.url_documents, { live: true, retry: true });
    this.documentsDB.replicate.from(config.couchDb.url_documents, opts);

    this.documentsDB.changes({
      since: 0,
      live: true
    }).on('change', () => this.changesCallbacks.map(cb => cb()));

    this.documentsDB.createIndex({
      index: { fields: ['visite'] }
    });
  }

  async resetDb(AGENT_DD_IDENT) {
    await this.documentsDB.destroy();
    await this.initDb(AGENT_DD_IDENT);
  }

  //call the callback on db changes
  onChanges(cb) {
    this.changesCallbacks.push(cb);
  }

  //getAllDocsOfTheDB
  getAllDocs() {
    return this.documentsDB
      .allDocs({ include_docs: true, descending: true })
      .then(table =>
        table.rows
          .map(item => item.doc)

          .filter(item => !(item._id.split('/')[0] == '_design'))
      );
  }

  getDocsByVisiteId(visiteid) {
    return this.documentsDB
      .find({
        selector: {
          visite: { $elemMatch: visiteid }
        }
      })
      .then(res => res.docs);
  }
  getDocsByDossierId(dossierid) {
    return this.documentsDB
      .find({
        selector: {
          dossier: dossierid
        }
      })
      .then(res => res.docs);
  }

  async postDocument(document) {
    return new Promise(async (resolve, reject) => {
      try {
        document["author"] = this.AGENT_DD_IDENT;
        await this.documentsDB.post(document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async editName(document) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.documentsDB.put(document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async deleteDocument(document) {
    return await this.documentsDB.remove(document);
  }
}

export default pouchDbDocumentsService;
