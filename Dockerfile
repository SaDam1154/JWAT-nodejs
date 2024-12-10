FROM node:20.1-alpine

WORKDIR /home/app

COPY . /home/app

RUN npm install

EXPOSE 3000
 # PORT MÁY ÁO

 CMD ["node", "index.js"]
