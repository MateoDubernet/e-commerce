# ECommerce

## Contexte

### Description
Il s'agit d'un projet utilisant Angular pour le frontend et Express.js pour le backend, il a été réaliser durant mon alternance dans le cadre d'un devoir maison.\
Cette application est une démo de site e-commerce avec visualisation de produit, ajout de produit au panier, validation du panier et visualisation du profil et des commandes réaliser.

---

## Prérequis

- Node.js et npm installés
- Angular CLI installé globalement (`npm install -g @angular/cli`)
- MySQL

---

## Installation et Lancement
### 1. Cloner le projet
```bash
   git clone https://github.com/MateoDubernet/e-commerce.git
```

### 2. Aller sur le projet
Depuis le dossier **e-commerce** ouvrir deux terminals un pour le dossier **frontend** et un autre pour le dossier **backend**

- Accèder au dossier **frontend** depuis le premier terminal :
```bash
  cd frontend
```
- Accèder au dossier **backend** depuis le premier terminal :
```bash
  cd backend
```

### 3. Installer les dépendances
Dans touts les terminals lancer la commande :
```bash
   npm install
```
ou
```bash
    npm install --force
```

### 4. Configuration
- Créer la base de données **e_commerce** avec MySQL
- Aller dans le fichier backend/src/main.ts -> 'new DatabaseConnection("localhost", "root", "root", "e_commerce", 3306)' - Remplacer les valeurs par celles pour la connexion à la base de données '(host, user, password, databaseName, port)'

### 5. Lancement
Dans le terminal pour le dossier backend :
```bash
  npm start
```
Dans le terminal pour le dossier frontend :
```bash
  ng serve
```
Dans le navigateur aller à l'adresse indiqué dans le terminal pour frontend (normalement http://localhost:4200/)

---

## Fonctionnalités
1. Créer un compte et se connecter
2. Voir la liste des produits en cliquant sur nos produits
3. Ajouter de produits au panier et visualiser les détails
4. Voir le panier et valider
5. Voir le profil pour avoir la liste des commandes qui sont classer par odre chronologique
