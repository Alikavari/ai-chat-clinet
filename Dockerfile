FROM node:23.11-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json .

RUN pnpm install

COPY . .

RUN pnpm run build-only

FROM caddy:2.8.4-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist/ /usr/share/caddy/

EXPOSE 5173
