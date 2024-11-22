FROM node:16-alpine as builder
WORKDIR /usr/src/estate
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder usr/src/estate/build  /usr/share/nginx/html