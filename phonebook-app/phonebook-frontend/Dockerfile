FROM node:16 AS build-stage

WORKDIR /usr/src/phonebook-frontend

COPY . .

RUN npm ci --only=production

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/persons

RUN npm run build

FROM nginx:1.20.1

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /usr/src/phonebook-frontend/build /usr/share/nginx/html
