FROM node:10

WORKDIR /ffxiv-organizer/ui

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]
