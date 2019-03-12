FROM node:8.11 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/online-judge-site /usr/share/nginx/html
