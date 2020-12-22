var Redis = require('ioredis')
const fs = require('fs');
const Discord = require('discord.js')

const client = new Discord.Client()

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
var save_version = require('./version/save-version.js')

/**
 * Retrieve all environment variables as constant values
 */
const token = process.env.TOKEN
// const public = process.env.PUBLIC
// const bot_id = process.env.BOT_ID
// const secret = process.env.SECRET
const redisPass = process.env.REDIS_PASS
const redisHost = process.env.REDIS_HOST

var redis = new Redis({
    port: 6379,          // Redis port
    host: redisHost,   	 // Redis host
    password: redisPass, // Redis pass
    db: 9,				 // Redis database
})

const cooldowns = new Discord.Collection();
const prefix = '!'

redis.get("check-redis").then((res) => console.log(res));
// redis.del('BotGuy-Versions')
redis.set('mod2', "0");

client.once('ready', () => {
	console.log("Bot has logged in successfully!");
	version.execute(client, save_version);
});


/**
 * When a message is sent in the server this function will be triggered
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
		
		try {
			func.execute(message, args);
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

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
	console.log("New member joined")
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	// Do nothing if the channel wasn't found on this server
	if (!channel) {
		console.log("Could not find channel to send welcome message")
		return;
	}
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member}`);
});

client.login(token)