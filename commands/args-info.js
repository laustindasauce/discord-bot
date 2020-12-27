/**
 * I'm not really sure the purpose of this command
 * 
 * Ability to take different arguments and do things with them
 */
module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	usage: '[some arguments]',
	args: true,
	readOnly: false,
	cooldown: 1,
	permLevel: 0,
	/**
	 * Checks the argument to see which function to call
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the specific version the user wants to see
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, args, _redis, _level) {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`First argument: ${args[0]}`);
		let arguments = args.join(' ')
		message.channel.send(`All args: ${arguments}`);
	},
	test() {
		return true;
	},
};