# --- Dockerfile ---
FROM node:20-alpine

# Define directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto definido en .env
EXPOSE 4000

# Define variable de entorno por defecto
ENV NODE_ENV=production

# Comando para ejecutar el servidor
CMD ["node", "src/server.js"]
