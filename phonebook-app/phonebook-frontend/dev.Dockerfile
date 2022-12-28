FROM node:16

WORKDIR /usr/src/phonebook-frontend

COPY . .

RUN npm install

CMD ["npm", "start"]