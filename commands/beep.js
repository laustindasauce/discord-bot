module.exports = {
	name: 'beep',
	description: 'Beep!',
	permLevel: 0,
	execute(message, _args, _redis, _level) {
		message.channel.send('Boop.');
	},
	test() {
		return true;
	},
};