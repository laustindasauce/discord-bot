module.exports = {
	name: 'some-function',
	aliases: ['func'],
	description: 'Testing functions!',
	args: false,
	readOnly: false,
	guildOnly: false,
	cooldown: 10,
	permLevel: 10,
	/**
	 * This command does nothing at this point
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};