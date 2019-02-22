FROM node:latest

RUN mkdir -p /client/dist/app

WORKDIR /client/dist/app

COPY package*.json ./

COPY . /client/dist/app

RUN npm install

RUN npm i -g nodemon

EXPOSE 3001

CMD [ "npm", "run", "dock" ]