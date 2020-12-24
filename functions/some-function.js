module.exports = {
	name: 'some-function',
	description: 'Testing functions!',
	execute(client, redis, message) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};