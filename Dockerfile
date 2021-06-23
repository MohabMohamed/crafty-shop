FROM node:16.3-alpine3.11 AS production-builder

WORKDIR /app
COPY package.json ./
COPY ./config ./config
RUN npm install --production

FROM node:16.3-alpine3.11 AS production
WORKDIR /app
COPY --from=production-builder /app ./
COPY ./src ./src
EXPOSE 3000
CMD ["npm", "run","start"]

FROM node:16.3-alpine3.11 AS development
WORKDIR /app
COPY --from=production-builder /app ./
RUN npm install --include=dev
COPY ./.git ./.git
COPY ./.husky ./.husky
VOLUME /app
RUN npm run prepare:dev
EXPOSE 3000
CMD ["npm", "run","dev"]















#COPY ["package.json", "package-lock.json", "./"]



