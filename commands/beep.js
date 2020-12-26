module.exports = {
	name: 'beep',
	aliases: ['boop', 'boink'],
	description: 'Beep!',
	args: false,
	readOnly: false,
	guildOnly: false,
	permLevel: 0,
	execute(message, _args, _redis, _level) {
		message.channel.send('Boop.');
	},
	test() {
		return true;
	},
};