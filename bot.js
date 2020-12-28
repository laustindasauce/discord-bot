var Redis = require('ioredis')
const fs = require('fs');
const Discord = require('discord.js')
const config = require("./config.js");

const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});

client.config = config

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

var profanity = require('./profanity/check-profanity.js');
var version = require('./version/version.js');
var messageEvent = require('./events/message.js');
var welcomeEvent = require('./events/welcome.js');
var goodbyeEvent = require('./events/goodbye.js');

/**
 * Retrieve all environment variables as constant values
 */
// const token = process.env.TOKEN
// const public = process.env.PUBLIC
// const bot_id = process.env.BOT_ID
// const secret = process.env.SECRET
const redisPass = client.config.redisPass;
const redisHost = client.config.redisHost;

var redis = new Redis({
    port: 6379,          // Redis port
    host: redisHost,   	 // Redis host
    password: redisPass, // Redis pass
    db: 9,				 // Redis database
});

const cooldowns = new Discord.Collection();
var prefix = client.config.defaultSettings.prefix;

redis.set('check-redis', 'Redis is running!');
redis.get("check-redis").then((res) => console.log(res));

/**
 * Runs once when the client initially gets set up
 */
client.once('ready', () => {
	console.log("Bot has logged in successfully!");
	/** Local redis has test as the value, and kubernetes redis has live as the value */
	redis.get('botguy-env').then((res) => {
		if (res !== "test") {
			version.execute(client, false);
		} else {
			version.execute(client, true);
			console.log("**************\nTest Env Active\n**************")
			prefix = client.config.defaultSettings.testPrefix;
			test_env = true;
		}
	})
});


/**
 * Event listener for when a message is sent in the guild
 */
client.on('message', message => {
	/**Before doing anything else I want to check the message for any blacklisted words*/
	let profanityRes = false;
	if (!message.author.bot) {
		try {
			profanityRes = profanity.execute(message);
		} catch (error) {
			console.error(error);
			message.reply('Unable to check this message for profanity..');
		}
	}
	if (!profanityRes) messageEvent.execute(message, Discord, client, redis, prefix, cooldowns);
});

/**
 * Event listener for when a user joins the guild
 * Sends message to let them know how to interact with the bot
 */
client.on('guildMemberAdd', (member) => {
	welcomeEvent.execute(member);
});

/**
 * Send a funny message when a user leaves the guild
 */
client.on('guildMemberRemove', member => {
    goodbyeEvent.execute(member, Discord)
})

/**
 * Not sure what I can do with this event yet
 */
// client.on("presenceUpdate", function(oldMember, newMember){
//     console.log(`a guild member's presence changes`);
// });

/**
 * This function is ran once at start to initialize the guild
 */
const init = async () => {

	// Generate a cache of client permissions for pretty perm names in commands.
	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[i];
		client.levelCache[thisLevel.name] = thisLevel.level;
	}

	client.permlevel = message => {
		let permlvl = 10;

		const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

		while (permOrder.length) {
			const currentLevel = permOrder.shift();
			if (message.guild && currentLevel.guildOnly) continue;

			if (currentLevel.check(message)) {
				permlvl = currentLevel.level;
				return permlvl;
			}
		}
	};

	client.login(client.config.token);
}

init();