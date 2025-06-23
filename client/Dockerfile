FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
