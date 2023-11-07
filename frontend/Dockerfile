FROM node:16.20.0 AS node
WORKDIR /code
COPY package*.json /code/
RUN npm install
COPY . /code/
RUN npm run build


FROM nginx:latest
RUN apt-get update && apt-get install gettext-base -y
COPY --from=node /code/dist /usr/share/nginx/html/
WORKDIR /var/www/html
COPY --from=node /code/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]