# Usa una imagen base de Node.js para la construcción de la aplicación
FROM node:19 AS builder

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo de configuración de paquetes (package.json) y el archivo de bloqueo de paquetes (package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos de la aplicación React al directorio de trabajo en el contenedor
COPY . .

# Construye la aplicación React para producción
RUN npm run build

# Usa una imagen base más ligera para servir la aplicación en producción
FROM nginx:alpine

# Copia los archivos construidos de la aplicación React desde el 'builder' al directorio de trabajo en el contenedor
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/

# Expone el puerto 80 para servir la aplicación
EXPOSE 8081

# El comando de inicio para servir la aplicación con Nginx
CMD ["nginx", "-g", "daemon off;"]