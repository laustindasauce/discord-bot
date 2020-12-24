module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	execute(message) {
		if (!message.mentions.users.size) {
			console.log(message.author);
			return message.author.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
		}

		const info = message.mentions.users.map(user => {
			console.log(user);
			return `Their username: ${user.username}\nTheir ID: ${user.id}`;
		});
		
		try {
			message.channel.send(info);
		} catch (error) {
			console.error(error)
		}
	},
	test() {
		return true;
	},
};