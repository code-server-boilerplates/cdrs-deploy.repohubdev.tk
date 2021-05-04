FROM node:14

COPY yarn.lock .yarn/ /app/
COPY package.json /app

RUN npm i -g yarn && yarn install

COPY . /app

WORKDIR /app

CMD ['yarn', 'start']
