FROM node:16

WORKDIR /usr/src/todo-frontend

COPY . .

RUN npm ci

RUN CI=true npm test

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]