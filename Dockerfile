FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN addgroup -S calculator && adduser -S calculator -G calculator

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R calculator:calculator /usr/share/nginx/html && \
    chown -R calculator:calculator /var/cache/nginx && \
    chown -R calculator:calculator /var/log/nginx && \
    chown -R calculator:calculator /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R calculator:calculator /var/run/nginx.pid

USER calculator

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]