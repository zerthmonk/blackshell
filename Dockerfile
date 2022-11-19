FROM node:16-alpine as base
RUN npm install -g npm@9.1.2

WORKDIR /app

RUN chown -R node:node .
COPY --chown=node:node /app .
RUN npm i

USER node

EXPOSE 8080

