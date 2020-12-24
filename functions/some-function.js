module.exports = {
	name: 'some-function',
	description: 'Testing functions!',
	permLevel: "Bot Owner",
	execute(client, redis, message) {
		message.channel.send('Function completed.');
	},
	test() {
		return true;
	},
};