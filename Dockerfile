FROM node:12.18.3

# Set working directory
WORKDIR /app

# Copy all folders and .js files
COPY . .

# Download the npm dependencies
RUN npm install

# Run our bot.js application
CMD [ "node", "bot.js" ]