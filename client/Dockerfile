# Étape 1 : Construction
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npx ng build --configuration production

# Étape 2 : Service via Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/e-commerce /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
