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
client.functions= new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of functionFiles) {
	const func = require(`./functions/${file}`);
	client.functions.set(func.name, func);
}

var profanity = require('./profanity/check-profanity.js')
var version = require('./version/version.js')
var save_version = require('./version/save-version.js');
// const { inherits } = require('util');

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
// redis.set('botguy-env', 'live')
// redis.del('BotGuy-Versions')
// redis.set('mod2', "0");
let test_env = false;

client.once('ready', () => {
	console.log("Bot has logged in successfully!");
	redis.get('botguy-env').then((res) => {
		if (res !== "test") {
			version.execute(client, save_version, false);
		} else {
			version.execute(client, save_version, true);
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
	/**
	 * Before doing anything else I want to check the message for any blacklisted words
	 */
	if (!message.author.bot) {
		try {
			profanity.execute(message);
		} catch (error) {
			console.error(error);
			message.reply('Unable to check this message for profanity..');
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));



	if (!command) {
		const func = client.functions.get(commandName)
		|| client.functions.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!func) return;

		if (func.test) {
			if (!test_env) return message.reply(`${func.name} is only callable in test environment!`);
		}

		if (func.readOnly) return message.reply(`${func.name} is read only!`);

		if (func.guildOnly && message.channel.type === 'dm') {
			return message.reply('I can\'t execute that function inside DMs!');
		}

		if (func.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
			if (func.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${func.name} ${func.usage}\``;
			}
			return message.channel.send(reply);
		}
		const level = client.permlevel(message);
		
		try {
			func.execute(client, redis, message, args, level);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that function!');
		}
		return
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

/**
 * Event listener for when a user joins the guild
 * Sends message to let them know how to interact with the bot
 */
client.on('guildMemberAdd', (member) => {
	// Send the message to a designated channel on a server:
	let channelID = '790611337545908306'
	const channel = client.channels.cache.find(channel => channel.id === channelID)
	// Do nothing if the channel wasn't found on this server
	if (!channel) {
		console.log("Could not find channel to send welcome message")
		return;
	}
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member.displayName}. Send **!help** in the bot-testing channel to get a list of my commands!`);
	console.log(`Welcomed ${member.displayName}`)
});

/**
 * Send a funny message when a user leaves the guild
 */
client.on('guildMemberRemove', member => {
    const goodbyeEmbed = new Discord.MessageEmbed()

    goodbyeEmbed.setColor('#f00000')
    goodbyeEmbed.setTitle('**' + member.user.username + '** was not the impostor there are **' + member.guild.memberCount + '** left Among Us')
    goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')

	member.guild.channels.cache.find(i => i.name === 'member-log').send(goodbyeEmbed)
	console.log("goodbye")
})

/**
 * Not sure what I can do with this event yet
 */
// client.on("presenceUpdate", function(oldMember, newMember){
//     console.log(`a guild member's presence changes`);
// });

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