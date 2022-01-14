FROM node:17-alpine

RUN apk update && apk upgrade \
    && apk add --no-cache bash git openssh

WORKDIR /app

RUN chown -R node:node .
COPY --chown=node:node app/package.json .
RUN npm i
COPY --chown=node:node ./app/ /

USER node

EXPOSE 8080

