FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# On installe toutes les dépendances, y compris les devDependencies (types TS)
RUN npm install

# On installe explicitement les types express pour être sûr
RUN npm install --save-dev @types/node@20
RUN npm install --save-dev @types/express @types/node

COPY . .

# Si ton projet doit être compilé avant de se lancer
# RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]