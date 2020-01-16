FROM node:10.16.1
COPY source/dist/. src/
WORKDIR /src
ENV MEMORY 2048
ENV MONGO_HOSTNAME outcomes-db
ENV MONGO_PORT 27017
ENV MONGO_USERNAME user
ENV MONGO_PASSWORD user
ENV MONGO_DB outcomes-database
EXPOSE ${API_PORT}
CMD node --max-old-space-size=$MEMORY --optimize-for-size --inspect config/server.js
