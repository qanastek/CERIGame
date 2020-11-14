# CERIgame

## Rendu 2

- [x] de vérification et stockage de la session de connexion côté serveur,
- [x] de notification à l’internaute de l’état de cette connexion : acceptée ou refusée
- [x] stockage de l’information de connexion, côté client, avec affichage des informations de
la dernière connexion.
- [x] → Echange des données entre le client et le serveur (requête/réponse HTTP) pour l’envoi des informations de connexion et l’état de connexion
- [x] → (côté back-end) Gestion de la connexion à la base de données PostgreSQL et consultation de la table users côté serveur pour la vérification des données de connexion de l’internaute (identifiant+mot de passe)
- [x] → (côté back-end) Sauvegarde des données de connexion (ou autres) par le gestionnaire de sessions associé à un store reposant sur le middleware MongoDBSession
- [x] → (côté front-end) Gestion d’un bandeau de notification et affichage des messages en lien avec la connexion réussie ou échouée de l’internaute (ce bandeau sera utilisé par la suite pour toutes les notifications adressées à l’internaute
- [x] → (côté front-end) Stockage et récupération des informations de la dernière connexion (date et heure) dans le Local Storage du navigateur pour affichage et mise à jour.

## Rendu 3

Il s’agit ici de développer la gestion des quizz en mode mono-joueur sans la notion de défi (qui
fera l’objet de l’étape suivante) avec :

- [ ] → (côtés front-end et back-end) Gestion du profil de l’internaute et de son historique de jeu
- [x] → (côtés front-end et back-end) Mise en place de l’interface pour la gestion d’un quizz et de son contexte de jeu :
  - [x] gestion des niveaux de jeu
  - [x] questions et réponses
  - [x] chronomètre
  - [x] temps de jeu
  - [x] scores attribués
  - [x] ...
- [x] → (côté back-end) Gestion de la base de données MongoDB pour la récupération des données utiles à la construction des quizz

## Rendu 4

Il s’agit ici de faire évoluer votre application en gérant les notifications de connexion et de déconnexion des internautes et en implémentant le mode “défi des internautes”.

- [ ] (côté back-end) Gestion des WebSockets - entrées/sorties
- [ ] (côté front-end) Gestion des WebSockets - entrées/sorties
- [ ] (côtés front-end et back-end) Gestion des notifications de connexion et de déconnexion des internautes
- [ ] (côté front-end) Ajout de la fonctionnalité “lancement d’un défi” à la fin d’un quizz vers un internaute ciblé
- [ ] (côtés front-end et back-end) Envoi d’une notification et gestion en fonction de l’état connecté ou non connecté de l’internaute défié
- [ ] (côtés front-end et back-end) Traitement de l’acceptation/refus d’un défi suite à une notification
- [ ] (côté front-end) Lancement d’un quizz après acceptation d’un défi
- [ ] (côtés front-end et back-end) Gestion du résultat d’un défi

## Linux commands

* `psql -h pedago01c.univ-avignon.fr -p 5432 -U uapv1701666 etd`

## Commands

* `nodemon Backend/app.js`
* `cd Frontend/ && npm run ng serve`
