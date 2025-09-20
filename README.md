# ECommerce

Cette application est une démo de site e-commerce avec visualisation de produit, ajout de produit au panier, validation du panier et visualisation du profil et des commandes réaliser.

---

## Installation
- Ouvrir deux terminal un pour le dossier frontend et un autre pour le dossier backend
- Accéder au dossier backend avec la commande cd backend et au dossier frontend avec la commande cd frontend
- Pour les deux lancer npm install --force

---

## Configuration
Aller dans le fichier backend/src/main.ts et rechercher 'new DatabaseConnection("localhost", "root", "root", "e_commerce", 3306)' et remplacer les valeurs par les votres '(host, user, password, databaseName, port)'

---

## Lancement
- Pour lancer le serveur aller sur backend et tapez la commande npm start
- Pour lancer le client aller sur frontend et tapez la commande ng s

Dans le navigateur aller à l'adresse indiqué dans le terminal pour frontend (normalement http://localhost:4200/)

---

## Utilisation
1. Créer un compte et se connecter
2. Voir la liste des produits en cliquant sur nos produits
3. Ajouter de produits au panier et visualiser les détails
4. Voir le panier et valider
5. Voir le profil pour avoir la liste des commandes qui sont classer par odre chronologique