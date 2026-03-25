FROM node:23-alpine

RUN apk add --no-cache libc6-compat curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Build at startup so NUXT_PUBLIC_* env vars are picked up
CMD ["sh", "-c", "npm run build && node .output/server/index.mjs"]
