
FROM node:18.16.0-alpine3.17

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8082

CMD [ "npm", "start"]
