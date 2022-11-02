FROM node:17-alpine as base

WORKDIR /app

RUN chown -R node:node .
COPY --chown=node:node /app .
RUN npm i

USER node

EXPOSE 8080

