# Dockerfile for read-service
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5009

CMD ["npm", "start"]
