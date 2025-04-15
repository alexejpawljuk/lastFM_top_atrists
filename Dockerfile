FROM node:18.16.1-alpine3.17

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 8070

CMD ["serve", "-s", "dist/last_fm", "-l", "8080"]