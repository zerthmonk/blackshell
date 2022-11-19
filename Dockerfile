FROM node:16-alpine as base
RUN npm install -g npm@latest

WORKDIR /opt

COPY app/package*.json /opt/
RUN npm i --prefix /opt

COPY . /opt

EXPOSE 5173

CMD [ "sh", "-c", "/opt/entrypoint.sh" ]