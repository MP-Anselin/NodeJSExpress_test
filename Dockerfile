### STAGE 1: Build ###
FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install mongodb
RUN npm install

COPY . /usr/src/app

CMD [ "yarn", "start", "dev" ]




