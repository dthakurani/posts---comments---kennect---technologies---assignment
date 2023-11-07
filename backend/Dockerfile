FROM node:16.20.0

WORKDIR /code

COPY package*.json /code

RUN npm install

COPY ./ /code/
EXPOSE 2003
CMD npm start