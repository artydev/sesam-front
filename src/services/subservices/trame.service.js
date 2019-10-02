import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';

PouchDB.plugin(PouchDBFind);

class PouchDBService {
  constructor(props, context) {
    this.initDb = this.initDb.bind(this);
    this.changesCallbacks = [];
    this.initDb();
  }

  async resetDb(AGENT_DD_IDENT) {
    await this.trameDB.destroy();
    await this.initDb();
  }

  async initDb() {
    var opts = {
      batch_size: 1000,
      live: true,
      retry: true
    };

		this.trameDB = new PouchDB('trames');
		
    this.trameDB.replicate
      .from(config.couchDb.url_trames, opts)
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.trameDB.replicate
      .to(config.couchDb.url_trames, opts)
      .on('change', () =>  {							
				this.changesCallbacks.map(cb => cb())
			});

    this.trameDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));
  }

  getTrameById(id) {
    return this.trameDB
      .find({
        selector: {
          _id: id
        }
      })
      .then(res => res.docs);
  }

  getAllDocs() {
    return this.trameDB
      .allDocs({ include_docs: true, descending: true })
      .then(table =>
        table.rows
          .map(item => item.doc)
          .filter(item => !(item._id.split('/')[0] == '_design'))
      );
  }

	// Modified version by SDD - Allow Error Trace 27/09/2019
  async postDocument(document) {
		var self = this
		await window.console.log("------------------- Save trame to Pouch DB (sesam-front-master\\src\\services\\subservices\trame.service.js)--------------------")
		await window.console.log(document)
    var saveTrame = new Promise(function (resolve) {
			try {			
				window.console.log("------------------- End Save trame to Pouch DB : SUCCESS --------------------")
				resolve(self.trameDB.post(document))
			}
			catch(e) {
				resolve("failed, raison : " + e)
			}
		});
		saveTrame.then((r) =>  {return r})
  }
}

export default PouchDBService;
