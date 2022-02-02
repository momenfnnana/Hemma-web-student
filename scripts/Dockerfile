# FROM node:12.18.1 as builder
# WORKDIR '/app'
# COPY ./package.json ./
# RUN npm install
# COPY .env.docker .env
# COPY . .
# RUN npm run build

FROM nginx:1.19.4
EXPOSE 80
COPY ./scripts/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html