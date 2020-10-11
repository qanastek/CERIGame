# CERIgame

## Rendu 2

[x] de vérification et stockage de la session de connexion côté serveur,
[x] de notification à l’internaute de l’état de cette connexion : acceptée ou refusée
[x] stockage de l’information de connexion, côté client, avec affichage des informations de
la dernière connexion.
[x] → Echange des données entre le client et le serveur (requête/réponse HTTP) pour l’envoi des
informations de connexion et l’état de connexion
[x] → (côté back-end) Gestion de la connexion à la base de données PostgreSQL et consultation
de la table users côté serveur pour la vérification des données de connexion de l’internaute
(identifiant+mot de passe)
[x] → (côté back-end) Sauvegarde des données de connexion (ou autres) par le gestionnaire de
sessions associé à un store reposant sur le middleware MongoDBSession
[ ] → (côté front-end) Gestion d’un bandeau de notification et affichage des messages en lien avec
la connexion réussie ou échouée de l’internaute (ce bandeau sera utilisé par la suite pour toutes
les notifications adressées à l’internaute
[x] → (côté front-end) Stockage et récupération des informations de la dernière connexion (date et
heure) dans le Local Storage du navigateur pour affichage et mise à jour.

## Rendu 3

Il s’agit ici de développer la gestion des quizz en mode mono-joueur sans la notion de défi (qui
fera l’objet de l’étape suivante) avec :

[ ] → (côtés front-end et back-end) Gestion du profil de l’internaute et de son historique de jeu
[ ] → (côtés front-end et back-end) Mise en place de l’interface pour la gestion d’un quizz et de son
contexte de jeu : gestion des niveaux de jeu, questions et réponses, chronomètre, temps de jeu,
scores attribués, ...
[ ] → (côté back-end) Gestion de la base de données MongoDB pour la récupération des données
utiles à la construction des quizz

## Linux commands

* `psql -h pedago01c.univ-avignon.fr -p 5432 -U uapv1701666 etd`

## Commands

* `nodemon Backend/app.js`
* `cd Frontend/ && npm run ng serve`
