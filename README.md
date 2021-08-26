# Discord Bot
This is using JavaScript to create a Discord bot. This interacts with [Discord.js](https://github.com/discordjs/discord.js) to automate commands within my Discord server.

## Dependencies
* [node.js](https://nodejs.org/en/)
* [Discord.js](https://github.com/discordjs/discord.js)
* [ioredis](https://www.npmjs.com/package/ioredis)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [badwords](https://www.npmjs.com/package/badwords)
* [moment](https://www.npmjs.com/package/moment)
* [moment-duration-format](https://www.npmjs.com/package/moment-duration-format)

## Functionality
Here is a brief list of the functionality of the bot. Check the commands folder for a more comprehensive look into what all commands are available
* Reply to specific keywords
* Send gifs
* Send updates (Of what i'm not sure)
* Show user statistics when prompted
* Ban users
* ETC...

## To Do
List of ideas to do next for this project
* Finalize fixing up the !help command with no arguments
* Implement the new key for channel on the commands which keeps commands only usable in specific channels
    * Should probably make this an array since it would be nice to allow several channels but not all of them for some commands
* Market channel
    * Create the channel
    * Add more bot functionality to the channel than just stock-info
    * Maybe something with getting a stocks move today or recent news on the stock etc.. 
    * Likely just use Finnhub since their API seems great for that