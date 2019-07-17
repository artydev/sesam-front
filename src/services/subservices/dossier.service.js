import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../../config';
import replicateFromSQL from '../replicationHandler';

PouchDB.plugin(PouchDBFind);

class PouchDbService {
    constructor(AGENT_DD_IDENT) {
        this.resetDb = this.resetDb.bind(this);
        this.initDb = this.initDb.bind(this);
        this.onChanges = this.onChanges.bind(this);

        this.changesCallbacks = [];

        this.initDb(AGENT_DD_IDENT);
    }

    async initDb(AGENT_DD_IDENT) {
        this.db = new PouchDB('mes-dossiers');
        this.replication = replicateFromSQL(this.db, config.backend.base_url + '/fulldata/dossiers?idAgent=' + AGENT_DD_IDENT, 'dossier_date');


        this.db.createIndex({
            index: { fields: ['DOSSIER_IDENT'] }
        });
        this.db.createIndex({
            index: { fields: ['ACDG_CODE_ACTION'] }
        });

        this.db.changes({
            since: 0,
            live: true
        }).on('change', () => this.changesCallbacks.map(cb => cb()));
    }

    async resetDb(AGENT_DD_IDENT) {
        this.replication.stopReplication();
        await this.db.destroy();
        await this.initDb(AGENT_DD_IDENT);
    }

    //call the callback on db changes
    onChanges(cb) {
        this.changesCallbacks.push(cb);
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

    getAllActionCode() {
        return this.getAllDocs().then(array =>
            array
                .map(item => item.ACDG_CODE_ACTION)
                .filter((value, index, self) => self.indexOf(value) === index)
        );
    }

    getDossierIdFromActionCode(actionCode) {
        return this.db
            .find({
                selector: {
                    ACDG_CODE_ACTION: actionCode
                }
            })
            .then(items => items.docs[0].DOSSIER_IDENT);
    }

    getDossierById(dossier) {
        return this.db
            .find({
                selector: {
                    DOSSIER_IDENT: parseInt(dossier)
                }
            })
            .then(res => res.docs[0]);
    }
}

export default PouchDbService;
