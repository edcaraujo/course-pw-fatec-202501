# Builder
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run swagger

RUN npm run build

# Image
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]