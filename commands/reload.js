module.exports = {
	name: 'reload',
	aliases: ['reconfigure'],
	description: 'This is deprecated since bot is running on Kubernetes with Pipelining',
	usage: '[command name]',
	args: true,
	readOnly: false,
	guildOnly: false,
	cooldown: 5,
	permLevel: 8,
	/**
	 * This command is able to reload a command to update as you code
	 * Only able to be used in test environment since the live environment is pipelined
	 * into Kubernetes cluster through github
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the specific version the user wants to see
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, args, _redis, _level) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
	test() {
		return false;
	},
};