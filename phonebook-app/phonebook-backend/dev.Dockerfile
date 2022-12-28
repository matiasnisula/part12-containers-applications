FROM node:16

WORKDIR /usr/src/phonebook-backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]