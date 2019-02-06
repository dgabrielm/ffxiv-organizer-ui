FROM node:10

WORKDIR /ffxiv-organizer/ui

COPY . .

RUN npm install

RUN cd app

RUN bower install

RUN cd ..

EXPOSE 8888

CMD ["npm", "start"]
