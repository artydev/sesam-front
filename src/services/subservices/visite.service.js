/* eslint-disable no-undef */
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import replicateFromSQL from '../replicationHandler';
import config from '../../config';
PouchDB.plugin(PouchDBFind);

class PouchDbVisiteService {
  constructor(AGENT_DD_IDENT) {
    this.resetDb = this.resetDb.bind(this);
    this.initDb = this.initDb.bind(this);
    this.postControlesByVisite = this.postControlesByVisite.bind(this);

    this.changesCallbacks = [];
    this.initDb(AGENT_DD_IDENT);
  }

  async resetDb(AGENT_DD_IDENT) {
    this.controleReplication.stopReplication();
    this.visiteReplication.stopReplication();
    await this.controleDB.destroy();
    await this.newControleDB.destroy();
    await this.visiteDB.destroy();
    await this.newVisiteDB.destroy();
    await this.initDb(AGENT_DD_IDENT);
  }

  async initDb(AGENT_DD_IDENT) {
    this.AGENT_DD_IDENT = AGENT_DD_IDENT;
    var opts = {
      batch_size: 1000,
      live: true,
      retry: true,
      filter: 'filters/by_user',
      query_params: { AGENT_DD_IDENT: AGENT_DD_IDENT }
    };

    var opts_without_filter = {
      batch_size: 1000,
      live: true,
      retry: true
    };

    this.controleDB = new PouchDB('controles');
    this.controleReplication = replicateFromSQL(
      this.controleDB,
      config.backend.base_url + '/fulldata/controles?idAgent=' + AGENT_DD_IDENT,
      'controle_date'
    );
    this.controleDB.createIndex({
      index: { fields: ['DOSSIER_IDENT'] }
    });
    this.controleDB
      .changes({ since: 'now', live: true })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.newControleDB = new PouchDB('new-controles');
    this.newControleDB.replicate.to(
      config.couchDb.url_new_controles,
      opts_without_filter
    );
    this.newControleDB.replicate.from(config.couchDb.url_new_controles, opts);
    this.newControleDB.createIndex({ index: { fields: ['DOSSIER_IDENT'] } });
    this.newControleDB.createIndex({ index: { fields: ['VISITE_IDENT'] } });
    this.newControleDB
      .changes({ since: 'now', live: true })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.visiteDB = new PouchDB('visites');
    this.visiteReplication = replicateFromSQL(
      this.visiteDB,
      config.backend.base_url + '/fulldata/visites?idAgent=' + AGENT_DD_IDENT,
      'visite_date'
    );
    this.visiteDB.createIndex({
      index: { fields: ['VISTE_IDENT'] }
    });
    this.visiteDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.newVisiteDB = new PouchDB('new-visites');
    this.newVisiteDB.replicate.to(
      config.couchDb.url_new_visites,
      opts_without_filter
    );
    this.newVisiteDB.replicate.from(config.couchDb.url_new_visites, opts);
    this.newVisiteDB.createIndex({
      index: { fields: ['VISITE_IDENT'] }
    });
    this.newVisiteDB
      .changes({ since: 'now', live: true })
      .on('change', () => this.changesCallbacks.map(cb => cb()));
  }

  //call the callback on db changes
  onChanges(cb) {
    this.changesCallbacks.push(cb);
  }

  //getAllDocsOfTheDB
  async getAllDocs() {
    let firstArray = await this.controleDB.allDocs({
      include_docs: true,
      descending: true
    });
    firstArray = firstArray.rows.map(item => item.doc);
    let secondArray = await this.newControleDB.allDocs({
      include_docs: true,
      descending: true
    });
    secondArray = secondArray.rows.map(item => item.doc);

    return secondArray
      .concat(firstArray)
      .filter(item => !(item._id.split('/')[0] == '_design'));
  }

  async getControlesByDossier(dossierID) {
    let firstArray = await this.controleDB.find({
      selector: { DOSSIER_IDENT: parseInt(dossierID) }
    });
    firstArray = firstArray.docs;
    let secondArray = await this.newControleDB.find({
      selector: { DOSSIER_IDENT: parseInt(dossierID) }
    });
    secondArray = secondArray.docs;
    return firstArray
      .concat(secondArray)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  async getControlesByVisite(visiteID) {
    let firstArray = await this.controleDB.find({
      selector: { VISITE_IDENT: parseInt(visiteID) }
    });
    firstArray = firstArray.docs;
    let secondArray = await this.newControleDB.find({
      selector: { VISITE_IDENT: parseInt(visiteID) }
    });
    secondArray = secondArray.docs;
    return firstArray
      .concat(secondArray)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  async getVisitesByDossier(dossierID) {
    let controles = await this.getControlesByDossier(dossierID);
    let visitesDic = {};
    for (let controle of controles) {
      visitesDic[controle.VISITE_IDENT] =
        visitesDic[controle.VISITE_IDENT] || [];
      visitesDic[controle.VISITE_IDENT].push(controle);
    }
    let visitesList = Object.keys(visitesDic).map(async VISITE_IDENT => {
      let visiteData = await this.visiteDB
        .find({ selector: { VISITE_IDENT: parseInt(VISITE_IDENT) } })
        .then(table => table.docs[0]);
      if (!visiteData) {
        visiteData = await this.newVisiteDB
          .find({ selector: { VISITE_IDENT: parseInt(VISITE_IDENT) } })
          .then(table => table.docs[0]);
      }
      if (visiteData) {
        return {
          visiteData,
          controles: visitesDic[VISITE_IDENT]
        };
      }
    });
    visitesList = await Promise.all(visitesList);
    // eslint-disable-next-line no-undefa
    return visitesList.filter(doc => doc);
  }

  associateTrame(visite, trame) {
    this.newVisiteDB.put({
      ...visite.visiteData,
      trame: trame
    });
  }

  updateTrame(visite, rev, trame) {
    return this.newVisiteDB.put({
      ...visite,
      _rev: rev,
      trame: trame
    });
  }

  getVisiteById(visiteid) {
    return this.newVisiteDB
      .find({ selector: { VISITE_IDENT: parseInt(visiteid) } })
      .then(res => res.docs[0]);
  }

  postControlesByVisite(visiteInfos, controlesList) {
    let promises = [];
    const ident = parseInt(
      Date.now().toString() + this.AGENT_DD_IDENT.toString()
    );
    promises.push(
      this.newVisiteDB.post({
        ...visiteInfos,
        VISITE_IDENT: ident,
        new_visite: true,
        AGENT_DD_IDENT: this.AGENT_DD_IDENT
      })
    );
    for (let controle of controlesList) {
      promises.push(
        this.newControleDB.post({
          AGENT_DD_IDENT: this.AGENT_DD_IDENT,
          ...controle,
          VISITE_IDENT: ident,
          new_visite: true,
          CONTROLE_IDENT:
            controle.DOSSIER_IDENT.toString() + controle.CPF_IDENT.toString(),
          TAPR_IDENT: controle.TAPR_IDENT
        })
      );
    }
    return Promise.all(promises);
  }

  updateVisite(visiteInfos, controlesList) {
    let promises = [];
    promises.push(this.newVisiteDB.put(visiteInfos));
    for (let controle of controlesList) {
      if (controle.exists) {
        promises.push(this.newControleDB.put(controle));
      } else {
        promises.push(
          this.newControleDB.post({
            AGENT_DD_IDENT: visiteInfos.AGENT_DD_IDENT,
            ...controle,
            VISITE_IDENT: visiteInfos.VISITE_IDENT,
            CONTROLE_IDENT:
              controle.DOSSIER_IDENT.toString() + controle.CPF_IDENT.toString(),
            TAPR_IDENT: controle.TAPR_IDENT
          })
        );
      }
    }
    return Promise.all(promises);
  }

  async exportToSora(VISITE_IDENT) {
    let visiteToExport = await this.newVisiteDB
      .find({ selector: { VISITE_IDENT: parseInt(VISITE_IDENT) } })
      .then(res => res.docs[0]);
    if (visiteToExport)
      await this.newVisiteDB.put({
        ...visiteToExport,
        new_visite: false,
        toBeExported: true
      });
  }
}

export default PouchDbVisiteService;
