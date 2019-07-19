# Documentation du front SESAM

## Architecture de l'application

Description de l'architecture et des différentes couches de stockage de l'application :

### PouchDb

[PouchDb](https://pouchdb.com/) est le module qui permet de stocker les donnés en local dans le client (ce qui permet d'utiliser ces données en mode hors-ligne). Tout le front est alimenté à partir de des données local du Pouchdb (mis en part pour les données accessibles uniquement en ligne telle que les informations entreprises et les informations utilisateur lors d'une déconnection où le front requête le back pour avoir les données.)

### Couchdb 

[Couchdb](http://couchdb.apache.org/) accessible à http://m.dgccrf.rie.gouv.fr/couchdb/_utils (utiliser les identifiants user: Admin, password: dtymoney91190) est la base de donnée côté serveur qui stocke toutes les données propre à l'application SESAM.
Par sa structure elle permet une réplication facile avec les bases pouchdb de chaque utilisateur, pouchdb étant conçu pour se synchronizer avec une base couchdb et résout lui même les problèmes de synchronisation quand l'utilisateur est hors-ligne.

Dans cette base nous pouvons donc retrouver les nouvelles visites (celle crée dans SESAM et pas encore exportées dans SORA), les nouveaux controles, les documents associés à un dossier ou une visite et les modèles de trame.

### Replication directe du SQL pour les données en lecture seule

Pour des raisons de performance, nous ne copions pas les données en lecture seule (les dossiers, codes activité DG, code produit CPF, les visites et controles de SORA non modifiable dans SESAM) dans la base Couchdb. Nous les répliquons directement du SQL en passant par le backend (le SQL n'étant pas exposé) et nous avons pour cela créé nous même un module de réplication, qui réplique les données une fois par jour mais qui réessaye tant que la réplication n'a pas réussie (pour gérer le mode hors ligne) (cf. [replicationHandler.js](./src/services/replicationHandler.js) )

## Structure des services

Les services du front sont les classes javascript qui gérent les différentes instances pouchdb et qui possèdent les méthodes qui permettent de faire des query sur ces instances pouchdb.
Les différents services sont définies dans le dossiers subservices et sont enregistrés dans le fichier [index.js](./src/services/index.js), depuis lequel on accède au différents services dans les composants. Ce super-service définit dans index.js permet de modifier facilement les utilisateurs : en effet chaque service doit avoir une méthode resetDb qui est appelé dès qu'on change d'utilisateur pour ensuite réinitialiser la base pouchdb avec le bon identifiant utilisateur (les services doivent avoir la méthode resetDb même si cette méthode ne fait rien cf. les services activités et cpf).

## Localstorage

On utilise aussi le localstorage pour stocker quelques informations pratiques pour le site, telles que le code AGENT_DD_IDENT de l'agent authentifié, le store redux qui permet de garder l'historique de navigation et d'avoir la navigation entre les différents onglet, et les dates des prochaines réplications prévues pour les replications SQL.

## Structure du code React

Le dossier components correspond à des petits composants qui peuvent être réutilisé dans plusieurs vues, tandis que le dossier containers correspond au différentes vues et est organisé  selon la logique de navigation (exemple le dossier visite contient les différentes vues dans une page visite qui sont trame, documents et photo).


