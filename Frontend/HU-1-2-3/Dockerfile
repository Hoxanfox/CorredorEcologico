# Etapa 1: Build de la aplicación Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Borrar archivos html por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos del build
COPY --from=build /app/dist/sendero /usr/share/nginx/html


# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
