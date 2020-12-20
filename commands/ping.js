module.exports = {
	name: 'ping',
	description: 'Simple check for if the bot is functioning',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};