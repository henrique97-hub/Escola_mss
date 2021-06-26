FROM node:alpine

WORKDIR /Comparar_Notas

COPY package*.json .


RUN npm install

COPY . .

EXPOSE 5100

CMD [ "npm", "run", "start" ]