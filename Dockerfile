FROM node:12.18.3

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY commands commands
COPY functions functions
COPY profanity profanity
COPY version version
COPY bot.js bot.js

RUN npm install

CMD [ "node", "bot.js" ]