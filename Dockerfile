FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci 

COPY . .

RUN npm run lint
RUN npm run build

FROM nginx:1.27-alpine 

RUN apk update && apk upgrade --no-cache

RUN addgroup -g 1001 -S calculator && \
    adduser -u 1001 -S calculator -G calculator

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R calculator:calculator /usr/share/nginx/html && \
    chown -R calculator:calculator /var/cache/nginx && \
    chown -R calculator:calculator /var/log/nginx && \
    chown -R calculator:calculator /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R calculator:calculator /var/run/nginx.pid

USER calculator

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
