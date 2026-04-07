FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install --save-dev @types/node@20
RUN npm install --save-dev @types/express @types/node

COPY . .
EXPOSE 3000
CMD ["npm", "start"]