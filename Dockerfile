FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm i -g nodemon && npm i -g mocha && npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]




