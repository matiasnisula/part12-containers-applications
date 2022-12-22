FROM node:16

WORKDIR /usr/src/todo-app/todo-backend

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start
