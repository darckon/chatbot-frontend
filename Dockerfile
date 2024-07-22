# Usa una imagen base de Node.js para la construcción de la aplicación
FROM node:19 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Descarga el archivo desde una URL (por ejemplo, un archivo .zip)
RUN wget -O chatbot_v3.glb https://storage.googleapis.com/mihistoria-377001.appspot.com/chatbot_v3.glb

# Copia el archivo de configuración de paquetes (package.json) y el archivo de bloqueo de paquetes (package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos de la aplicación React al directorio de trabajo en el contenedor
COPY . .

RUN mv chatbot_v3.glb public/bot

# Construye la aplicación React para producción
RUN npm run build

# Usa una imagen base más ligera para servir la aplicación en producción
FROM nginx:alpine

# Copia los archivos construidos de la aplicación React desde el 'builder' al directorio de trabajo en el contenedor
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/

# Expone el puerto 80 para servir la aplicación
EXPOSE 8082

# El comando de inicio para servir la aplicación con Nginx
CMD ["nginx", "-g", "daemon off;"]