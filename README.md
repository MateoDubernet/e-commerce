# ECommerce

## Présentation
Ce projet est une application démo de site e-commerce, il a été réaliser durant mon alternance dans le cadre d'un devoir maison.

### Architecture
- **Front-end** : Angular.
- **Back-end** : ExpressJs.
- **Base de données** : Mysql.
- **Infrastructure** : Docker & Docker Compose.

---

## Installation et Lancement
### 1. Clonage du dépôt
```bash
   git clone https://github.com/MateoDubernet/e-commerce.git
```

### 2. Lancement (Docker)
**Prérequis :** [Docker Desktop](https://www.docker.com/products/docker-desktop) installé et lancé.

```bash
    cd ./e-commerce
    docker-compose up --build
```
### 3. Accès
- **Interface Client** : http://localhost (Port 80)

[!IMPORTANT]
Assurez-vous que les ports 80 et 8000 ne sont pas déjà utilisés par une autre application sur votre machine avant de lancer le conteneur.

---

## Fonctionnement du Système
1. Créer un compte et se connecter

2. Voir la liste des produits en cliquant sur nos produits

3. Ajouter de produits au panier et visualiser les détails

4. Voir le panier et valider

5. Voir le profil pour avoir la liste des commandes qui sont classer par odre chronologique
