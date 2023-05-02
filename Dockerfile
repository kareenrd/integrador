# Configura la imagen base
FROM node:14-alpine as build

# Configura el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el contenido de la carpeta actual a la imagen
COPY . .

# Compila la aplicación
#RUN npm run build --prod

# Configura la imagen final
FROM nginx:alpine

# Copia los archivos de la compilación a la imagen final
COPY --from=build /app/dist/integrador /usr/share/nginx/html

# Configura el puerto
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
