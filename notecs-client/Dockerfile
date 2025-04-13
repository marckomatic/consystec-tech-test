FROM node:22.14 as builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --prod

FROM nginx:alpine

COPY --from=builder /app/dist/my-angular-app /usr/share/nginx/html

EXPOSE 80
