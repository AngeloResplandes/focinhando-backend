FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install --omit=dev && npm cache clean --force


FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma/migrations ./prisma/migrations
COPY --from=build /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
EXPOSE 4444
CMD ["node", "dist/server.js"]