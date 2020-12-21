module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	execute(message, args) {

		if (message.member.hasPermission('MANAGE_MESSAGES')) {

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
		} else {
			// Otherwise, let the user know they don't have permission to manage messages
            message.reply("You don't have permissions to manage messages.\n<@&790612674106097754> can you check on this.")
		}
	},
};