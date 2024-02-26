# ArtShop

## Description

ArtShop est une application web basée sur Symfony et React, créée pour la vente d'œuvres d'art en ligne. L'application offre une expérience utilisateur intuitive pour explorer, acheter et interagir avec différentes œuvres d'art.

## Technologies Utilisées

- Symfony
- React
- Doctrine ORM
- Docker

## Configuration du Projet

### Installation avec Docker

1. Clonez ce dépôt : `git clone https://github.com/PourthieAlexis/ArtShop.git`
2. Allez dans le répertoire du projet : `cd ArtShop`
3. Copiez le fichier `.env` en `.env.local` et configurez les paramètres.
4. Lancez Docker Compose : `docker-compose up -d`
5. Allez dans le conteneur pour exécuter les migrations `docker exec -it app-backend-dev /bin/bash`
5. `php bin/console make:migration`
6. `php bin/console d:m:m`
7. `php bin/console d:f:l`
8. exit
9. Pour éteindre le serveur : `docker-compose down`

Accéder au back sur docker `docker exec -it app-backend-dev /bin/bash`
Accéder au front sur docker `docker exec -it app-front-dev sh`

Pour les prochains démarrages du projet utilisé `docker compose up -d` et fermer le avec `docker compose down`

L'application sera disponible à l'adresse : `http://localhost:3000`
Le serveur sera disponible à l'adresse : `http://localhost:8000`
L'adminer pour l'interface de la base de donnée : `http://localhost:8081`


## Auteurs

- Alexis Pourthié
