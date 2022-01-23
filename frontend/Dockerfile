FROM node:17-alpine

RUN apk update && apk upgrade \
    && apk add --no-cache bash git openssh

WORKDIR /app

RUN chown -R node:node .
COPY --chown=node:node . .
RUN npm i

USER node

EXPOSE 8080

