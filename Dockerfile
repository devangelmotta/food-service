# Usa la imagen oficial de Node.js 16 como imagen base
FROM node:18.16.0-alpine
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD [ "npm", "run", "start:dev" ]
