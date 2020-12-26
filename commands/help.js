module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	args: false,
	readOnly: false,
	guildOnly: false,
	cooldown: 5,
	permLevel: 0,
	execute(message, args, _redis, _level) {
		const data = [];
		const { commands, functions } = message.client;

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(functions.map(command => command.name).join(', '));
			// data.push(`\n You can send **![command name] in the dm's or a text channel to run the command!`)
			data.push(`\nSend \`!help [command name]\` to get info on a specific command and how to use it!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		const func = functions.get(name) || functions.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			if (!func) return message.reply('that\'s not a valid command!');

			data.push(`**Name:** ${func.name}`);

			if (func.aliases) data.push(`**Aliases:** ${func.aliases.join(', ')}`);
			if (func.description) data.push(`**Description:** ${func.description}`);
			if (func.usage) data.push(`**Usage:** !${func.name} ${func.usage}`);

			data.push(`**Cooldown:** ${func.cooldown || 3} second(s)`);

		} else {
			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) {
				data.push(`**Usage:** !${command.name} ${command.usage}`);
			} else data.push(`**Usage:** !${command.name}`)

			data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		}

		message.channel.send(data, { split: true });
	},
	test() {
		return true;
	},
};