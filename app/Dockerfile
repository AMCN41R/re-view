FROM node:10-alpine

WORKDIR /app
COPY / ./

ENV NODE_ENV=production

RUN npm run bootstrap
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
