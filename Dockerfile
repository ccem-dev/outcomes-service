FROM node:10.16.1
COPY source/dist/. src/
WORKDIR /src
ENV MEMORY 2048
ENV API_PORT 8080
ENV DATABASE_HOSTNAME otus-database
ENV DATABASE_PORT 27017
ENV DATABASE_USER outcomes
ENV DATABASE_PASS outcomes
ENV DATABASE outcomes-database
CMD node --max-old-space-size=$MEMORY --optimize-for-size --inspect config/server.js
