# ETAPA COMPILACION: Esta etapa generará la ejecución y compilación de la aplicación
FROM node:22 AS etapa-compilacion

# Nos permite posicionarnos directamente en la ruta donde esta nuesta aplicación  
WORKDIR /usr/app 

# Se copia lo de ORIGEN:DESTINO (donde estará la imagen)
COPY ./ ./

RUN npm install

RUN npm run test

RUN npm run build


# ETAPA EJECUCIÓN: Solo creamos la imagen y guardamos solo los archivos que fueron compilados dejando fuera el resto 
#                  y así la imagen final pesará mucho menos por que solo tendra el publicado 
FROM node:22-alpine AS etapa-ejecucion

WORKDIR /usr/app

# Se copian solo los datos de la compilación y su node_modules (origen archivos destino)
COPY --from=etapa-compilacion /usr/app/dist ./dist
COPY --from=etapa-compilacion /usr/app/node_modules ./node_modules
COPY --from=etapa-compilacion /usr/app/package*.json ./

# Se utiliza unicamente para documentar y mencionar que puerto esta usando la aplicacion
EXPOSE 3000

# Ejecuta la aplicación que esta compilada luego del build dentro de la carpeta DIST
CMD ["node", "dist/main.js"]