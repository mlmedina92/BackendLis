FROM node:18
WORKDIR /app
#COPY . .
#RUN npm i 
EXPOSE 8080
CMD [ "node", "src/server.js" ]