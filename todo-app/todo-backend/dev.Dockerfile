FROM node:16

WORKDIR /usr/src/todo-backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]