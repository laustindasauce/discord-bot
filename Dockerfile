FROM node:12.18.3

# Set working directory
WORKDIR /app

# Copy all folders and .js files
# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY commands commands
# COPY profanity profanity
# COPY version version
# COPY test test
# COPY config.js config.js
# COPY bot.js bot.js
COPY ./bin/main .

# Download the npm dependencies
RUN npm install

# Run our bot.js application
CMD [ "node", "bot.js" ]