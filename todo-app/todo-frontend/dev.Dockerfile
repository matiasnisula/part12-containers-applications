FROM node:16

WORKDIR /usr/src/todo-frontend

COPY . .

RUN npm install

CMD ["npm", "start"]