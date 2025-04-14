FROM node:22.14 as builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production 

FROM nginx:alpine

COPY --from=builder /app/dist/notecs-client/browser /usr/share/nginx/html

EXPOSE 80
