# install node.js
FROM node:20 AS DEANfrontend

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV VITE_BACKEND_URL=https://ncuesaweb.ncue.edu.tw/DEAN-api
ENV VITE_BACKEND_TIMEOUT=10000

RUN npm run build

# install nginx
FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/