const Discord = require('discord.js');
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#ff2052')
	.setAuthor('BotGuy', 'https://discord.com/channels/@me/790100058682294302/791705870567604264', 'https://discord.js.org');

module.exports = {
	name: 'version',
	aliases: ['versions', 'v'],
	description: 'Give insight into the versions of BotGuy.',
	args: true,
	cooldown: 8,
	usage: '[specific version] OR [all] OR [latest]',
	permLevel: 0,
	execute(message, args, redis, _level) {
		versions = args.join(' ');

		if (versions === "all") {
			get_versions(message, redis).then(() => console.log(`DM sent with all available versions.`));
		} else if (versions === "latest") {
			redis.get('botguy-version').then((res) => {
				return message.reply(`the latest version is v${res}`)
					.then(() => {
						console.log("Replied with latest version of BotGuy.")
					})
					.catch(error => {
						console.error(`Could not send version reply to ${message.author.tag}.\n`, error);
					});
				})
		} else {
			get_hash(message, args, redis).then(() => console.log(`DM sent with info on version.`));
		}
	},
	test() {
		return true;
	},
};

async function get_hash(message, args, redis) {
	commandHash = "hash-" + args.join(' ') + "-commands";
	functionHash = "hash-" + args.join(' ') + "-functions";

	exampleEmbed.setTitle(`v${args}`)
	exampleEmbed.setDescription(`**Modules available to BotGuy as of v${args}**`)

	let data = [];

	let hash = null;
	let funcHash = null;
	try {
		hash = await redis.hgetall(commandHash)
	} catch (error) {
		
	}

	try {
		funcHash = await redis.hgetall(functionHash)
	} catch (error) {
		
	}
	
	if (hash !== null) {
		let entries = Object.entries(hash)
		let i = 0;
		for (var [name, description] of entries) {
			// if (i === 0) {
			// 	exampleEmbed.setTitle(` AS OF VERSION ${args}`);
			// 	data.push("= Commands =\n");
			// 	i = 1;
			// }
			data.push(`• ${name} :: ${description}\n`);
			exampleEmbed.addField(name, description, true);
		}
		
	}
	if (funcHash !== null) {
		let j = 0;
		let entries = Object.entries(funcHash)
		for (var [name, description] of entries) {
			// if (j === 0) {
			// 	data.push("= Functions =\n");
			// 	j = 1;
			// }
			data.push(`• ${name} :: ${description}\n`);
			exampleEmbed.addField(name, description, true);
		}
	}

	if (!data.length) {
		data.push(`${args} is not a valid version of BotGuy`);
		data.push("Try the command !version all")
		return message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with the version details!');
			})
			.catch(error => {
				console.error(`Could not send version DM to ${message.author.tag}.\n`, error);
				message.reply('it seems like I can\'t DM you!');
			});
	}

	exampleEmbed.setTimestamp()
	exampleEmbed.setFooter('To run a command send => **![command name]**', 'https://discord.bots.gg/img/logo_transparent_coloured.png');

	return message.author.send(exampleEmbed)
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with the version details!');
		})
		.catch(error => {
			console.error(`Could not send version DM to ${message.author.tag}.\n`, error);
			message.reply('it seems like I can\'t DM you!');
		});
	
}

async function get_versions(message, redis) {
	let data = [];

	data.push("Here are all versions for BotGuy:");
	arr = await redis.smembers("BotGuy-Versions");
	
	console.log(arr)

	for (let i = 0; i < arr.length; i++) {
		data.push(arr[i]);
	}
	return message.author.send(data, { split: true })
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all versions!');
		})
		.catch(error => {
			console.error(`Could not send versions DM to ${message.author.tag}.\n`, error);
			message.reply('it seems like I can\'t DM you!');
		});
}