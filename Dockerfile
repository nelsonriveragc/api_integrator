# Use the official Node.js image.
FROM node:20.13.1

# Instala git
RUN apt-get update && apt-get install -y git

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Clona el repositorio
RUN git clone https://github.com/nelsonriveragc/api_integrator.git .

# Copiar el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación (utilizando nodemon para auto-reinicio)
CMD ["npm", "run", "start"]