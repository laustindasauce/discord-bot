module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	args: true,
	permLevel: 0,
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