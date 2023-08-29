ARG NODE_VERSION=latest

FROM node:${NODE_VERSION} as development

LABEL org.opencontainers.image.authors="forbiddencoding"

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ARG NESTJS_VERSION=latest

CMD ["npm", "run", "start:dev"]