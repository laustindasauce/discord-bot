module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them.',
	usage: '[@member]',
	args: false,
	readOnly: false,
	guildOnly: true,
	cooldown: 5,
	permLevel: 3,
	execute(message, _args, _redis, _level) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const user = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${user.username}`);
		
		if (user) {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member
				.kick('Optional reason that will display in the audit logs')
				.then(() => {
					// We let the message author know we were able to kick the person
					message.reply(`Successfully kicked ${user.tag}`);
				})
				.catch(err => {
					// An error happened
					// This is generally due to the bot not being able to kick the member,
					// either due to missing permissions or role hierarchy
					message.reply('I was unable to kick the member');
					// Log the error
					console.error(err);
				});
			} else {
				// The mentioned user isn't in this guild
				message.reply("That user isn't in this guild!");
			}
		// Otherwise, if no user was mentioned
		} else {
		message.reply("You didn't mention the user to kick!");
		}
	},
	test() {
		return true;
	},
};