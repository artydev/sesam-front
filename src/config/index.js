var url_prefix_mprod = 'https://Admin:dtymoney91190@m.dgccrf.rie.gouv.fr/couchdb';
var url_prefix_mtest = 'http://admin:admin@m-test.dgccrf.rie.gouv.fr/couchdb';
var url_prefix_local = 'http://admin:admin@localhost:5984';

let url_prefix, base_url;
function setUrlPrefix () {
	const hostname = "" + window.location.hostname;
	const localhost =  hostname.indexOf("localhost") >= 0
	const mtest = hostname.indexOf("m-test") >= 0
	const mprod = hostname.indexOf("m.dgccrf") >= 0
	localhost && (url_prefix = url_prefix_local) && (base_url = 'http://localhost:8080')
		|| mtest && (url_prefix = url_prefix_mtest) && (base_url = '/data' )
		|| mprod && (url_prefix = url_prefix_mprod) && (base_url = '/data' )
}

setUrlPrefix();

window.console.log("\n-------------------- Config Serveurs -------------------");
window.console.log('CouchDB : ' + url_prefix.split("@")[1]);
window.console.log('Backend : ' + base_url);
window.console.log("-----------------------------------------------------------------\n")


export default {
  replication_starting_hour: 9, // at 9am every morning the new data is here we have to refetch it
  backend: {
  base_url: base_url
  //base_url: '/data' // prod, test
  },
  couchDb: {
    url_dossiers: url_prefix + '/dossiers',
    url_controles: url_prefix + '/controles',
    url_documents: url_prefix + '/documents',
    url_new_controles: url_prefix + '/new-controles',
    url_visites: url_prefix + '/visites',
    url_activite: url_prefix + '/activite',
    url_cpf: url_prefix + '/produit-cpf',
    url_trames: url_prefix + '/trames',
		url_new_visites: url_prefix + '/new-visites',
  }
};
