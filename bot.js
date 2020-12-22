var Redis = require('ioredis')
var badwordsArray = require('badwords/array');
const fs = require('fs');
const Discord = require('discord.js')
const fetch = require('node-fetch')
const client = new Discord.Client()

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

/**
 * Retrieve all environment variables as constant values
 */
const token = process.env.TOKEN
const public = process.env.PUBLIC
const bot_id = process.env.BOT_ID
const secret = process.env.SECRET
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

client.once('ready', () => {
	console.log("Bot has logged in successfully!")
});

redis.get("check-redis").then((res) => console.log(res));

/**
 * When a message is sent in the server this function will be triggered
 */
client.on('message', message => {

	/**
	 * Before doing anything else I want to check the message for any bad words
	 */
	if (!message.author.bot) check_profanity(message);

    tokens = message.content.split(' ')

    if (tokens[0] == `${prefix}gif`) {
        get_gif(message, tokens)
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

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
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member}`);
});

async function get_gif(message, tokens) {
    let keywords = 'happy'
    if (tokens.length > 1) {
        keywords = tokens.slice(1, tokens.length).join(' ')
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=off`
    let response = await fetch(url)
    let json = await response.json()
    const index = Math.floor(Math.random() * json.results.length)
    message.channel.send(json.results[index].url)
    console.log("gif sent")
}

function check_profanity(message) {
	for (var i in badwordsArray) {
		if (message.content.toLowerCase().includes(badwordsArray[i])) {
			let data = []
			message.delete();
			data.push("Profanity was found in your message:")
			data.push(message.content)
			let title = message.author.tag + "-prof-count"
			// console.log(title)
			redis.incr(title)
			let count = 0;
			redis.get(title).then(function (res) {
				count = res;
				let body = "You have now sent " + count + " messages marked as containing profanity.";
				data.push(body)
				if (3 - count == 1) {
					body = "If you send 1 more profane message you will be kicked from the server.";
				} else if (count > 2) {
					body = "You have been kicked from the server for sending too many messages containing profanity.";
				} else {
					count = 3 - count
					body = "If you send " + count + " more profane messages you will be kicked from the server.";
				}
				data.push(body)
				body = "If you believe to have received this in error and the message you sent was clean, ";
				body += "please submit an appeal to one of the admins."
				data.push(body)
				
				return message.author.send(data, { split: true })
					.then(() => {
						if (res > 2) {
							/**
							 * Uh oh this user can't control their potty mouth... 
							 * I think for now this will just be a kick
							 * The user can rejoin still if they have an invite and will be kicked again
							 * each time they come back and send a profane message
							 * 
							 * Could adjust this to ban if need be
							 * Also could have a second if that is 10 or so and have that ban the user
							 */
							message.member
							.kick('User has sent a message with profanity at least 3 times now.')
							.then(() => {
								// We let the message author know we were able to kick the person
								message.reply(`Successfully kicked ${message.author.tag}`);
							})
							.catch(err => {
								// An error happened
								// This is generally due to the bot not being able to kick the member,
								// either due to missing permissions or role hierarchy
								message.reply('I was unable to kick the member');
								// Log the error
								console.error(err);
							});
						}
						if (message.channel.type === 'dm') return;
						message.channel.send('https://tenor.com/view/watch-your-profanity-funny-gif-5600117');
					})
					.catch(error => {
						console.error(`Could not send profanity warning DM to ${message.author.tag}.\n`, error);
						message.reply('It seems like I can\'t DM you!\nhttps://tenor.com/view/watch-your-profanity-funny-gif-5600117');
					});
			});
		}
	}
}


client.login(token)