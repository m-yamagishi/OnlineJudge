FROM node:8.11 as node
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y mongodb
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "node", "app.js" ]