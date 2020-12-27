module.exports = {
	name: 'ban',
    description: 'Tag a member and ban them.',
    usage: '[@member]',
    args: false,
    readOnly: false,
    guildOnly: true,
    cooldown: 3,
    permLevel: 4,
    /**
	 * This command is able to return the ban the tagged user
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the specific version the user wants to see
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to ban them!');
        }

        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                /**
                 * Ban the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 * Read more about what ban options there are over at
                 * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
                 */
                member
                .ban({
                    reason: 'They were bad!',
                })
                .then(() => {
                    // We let the message author know we were able to ban the person
                    message.reply(`Successfully banned ${user.tag}`);
                })
                .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to ban the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to ban the member');
                    // Log the error
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
        } else {
        // Otherwise, if no user was mentioned
        message.reply("You didn't mention the user to ban!");
        }
    },
    test() {
		return true;
	},
};