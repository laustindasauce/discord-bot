module.exports = {
	name: 'kick',
    description: 'Tag a member and kick them.',
    redis: true,
	execute(message, redis) {

		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (!message.mentions.users.size) {
				return message.reply('You need to tag a user in order to decrease their profanity count!');
			}

			const user = message.mentions.users.first();

			if (user) {
				const member = message.guild.member(user);
				// If the member is in the guild
				if (member) {
                    let count = 0;
                    let title = member.tag + "-prof-count";
                    redis.get(title)
					.then((res) => {
						if (res > 0) {
                            redis.decr(title).then(() => count = res).catch(err => {
                                // An error happened
                                message.reply(`I was unable to edit this ${member.tag}'s profanity count`);
                                // Log the error
                                console.error(err);
                            })
                        } else {
                            message.reply(`${member.tag} doesn't have any profanity incidents.`)
                        }
					})
					.catch(err => {
						// An error happened
						message.reply(`I was unable to edit ${member.tag}'s profanity count`);
						// Log the error
						console.error(err);
					});
				} else {
					// The mentioned user isn't in this guild
					message.reply(`${member.tag} isn't in this guild!`);
				}
			// Otherwise, if no user was mentioned
			} else {
			message.reply("You didn't mention the user to edit!");
			}
		} else {
            // Otherwise, let the user know they don't have permission to kick
            message.reply("You don't have permissions to decrease users' profanity count.\n<@&790612674106097754> can you check on this.")
        }
	},
};