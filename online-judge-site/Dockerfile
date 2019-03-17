FROM node:8.11 as node
WORKDIR /app
COPY . .
RUN apt-get update
RUN npm install
RUN npm run build --prod --baseHref=/online-judge-site/

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/online-judge-site /usr/share/nginx/html
