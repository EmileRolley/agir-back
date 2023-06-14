## Description

Backend de l'application XXX

## Installation

```bash
$ npm install
```

## Configuration de la base de données

### Prérequis
avoir un environnement : docker fonctionnelle (docker et docker-compose)

Sur mac voici une façon de faire (si vous ne pouvez pas utiliser Docker Desktop pour des questions de licence):

```bash
# Install hyperkit and minikube
brew install hyperkit
brew install minikube

# Install Docker CLI
brew install docker
brew install docker-compose

# Start minikube
minikube start

# Tell Docker CLI to talk to minikube's VM
eval $(minikube docker-env)

# Save IP to a hostname
echo "`minikube ip` docker.local" | sudo tee -a /etc/hosts > /dev/null

# Test
docker run hello-world
```

### Paramétrage des URLs
*  Dupliquer le fichier ```.env.sample``` en un fichier ```.env``` et un second fichier ```.env.test```
* renseigner les URLs respectives de votre base de test base de dev

### Lancer les bases de données
```bash
npm run db:up
```
### Lancer les migrations sur les bases de dev et tests
```bash
npm run db:update
```

### Lancer les tests d'intégration
Pour vérifier que tout marche bien
```bash
npm run test:int
```

Cela va :
1. Lancer les images dockers dev et tests (si besoin)
2. Jouer les migrations prisma (si besoin)
3. Executer les tests d'intégration

### Stoper et détruire les bases de dev et tests
Si elle ne vous sont plus utiles, ou pour repartir de rien
```bash
npm run db:destroy
```




## Running the app

```bash
# build project
$ npm run build

# start backend
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

