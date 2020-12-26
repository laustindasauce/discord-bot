module.exports = {
	name: 'some-function',
	description: 'Testing functions!',
	permLevel: 10,
	execute(client, redis, message) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};