module.exports = {
	name: 'prune',
	aliases: ['delete'],
	description: 'Prune up to 99 messages.',
	usage: '[number 1-99]',
	args: true,
	readOnly: false,
	guildOnly: true,
	cooldown: 5,
	permLevel: 3,
	/**
	 * This command is able to bulk delete messages from the channel it was sent in
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the specific version the user wants to see
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, args, _redis, _level) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
	test() {
		return true;
	},
};