FROM node:12.18.1 as builder
WORKDIR '/app'
COPY ./package.json ./
RUN yarn
COPY .env.docker .env
COPY . .
RUN yarn build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html