module.exports = {
	name: 'beep',
	aliases: ['boop', 'boink'],
	description: 'Beep!',
	args: false,
	readOnly: false,
	channels: ['bot-testing'],
	guildOnly: false,
	permLevel: 0,
	/**
	 * This command is a simple call and response
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
		message.channel.send('Boop.');
	},
	test() {
		return true;
	},
};