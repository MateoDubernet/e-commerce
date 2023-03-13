# ECommerce

Ouvrir deux terminal un pour le dossier frontend et un autre pour le dossier backend

Accéder au dossier backend avec la commande cd backend et au dossier frontend avec la commande cd frontend

Pour les deux lancer npm install --force

Ensuite avant de lancer le serveur aller dans le fichier backend/src/main.ts et rechercher 'new DatabaseConnection("localhost", "root", "root", "e_commerce", 3306)' et remplacer les valeurs par les votres '(host, user, password, databaseName, port)'

Pour lancer le serveur aller sur backend et tapez la commande npm start

Pour lancer le client aller sur frontend et tapez la commande ng s

Dans votre navigateur aller à l'adresse indiqué dans le terminal pour frontend (normalement http://localhost:4200/)
