module.exports = {
	name: 'ping',
	description: 'Simple check for if the bot is functioning',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
	},
};