FROM node

WORKDIR /api

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY src src

CMD ["npm", "start"]