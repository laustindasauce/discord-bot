module.exports = {
	name: 'some-function',
	description: 'Testing functions!',
	execute(message) {
		message.channel.send('Function completed.');
	},
};