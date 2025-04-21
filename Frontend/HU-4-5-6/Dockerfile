# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias y configurar las dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Compilar la aplicación para producción (esto genera los archivos en /build)
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar el build de React al directorio que Nginx sirve
COPY --from=build /app/dist /usr/share/nginx/html


# Exponer el puerto en el que se servirá la aplicación
EXPOSE 81

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
