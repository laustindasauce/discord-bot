module.exports = {
	name: 'some-function',
	aliases: ['func'],
	description: 'Testing functions!',
	args: false,
	readOnly: false,
	guildOnly: false,
	cooldown: 10,
	permLevel: 10,
	execute(message, _args, _redis, _level) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};