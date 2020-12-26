module.exports = {
	name: 'some-function',
	description: 'Testing functions!',
	permLevel: 10,
	execute(message, _args, _redis, _level) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};