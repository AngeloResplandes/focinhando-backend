FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production


FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
