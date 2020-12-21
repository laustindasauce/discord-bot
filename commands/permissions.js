module.exports = {
	name: 'permissions',
	description: 'View your permissions or tag another user to see their permissions.',
	execute(message) {
        const data = [];

        if (!message.mentions.users.size) {
            const memberPermissions = message.member.permissions.serialize();
            
            data.push('Here\'s a list of your permissions:');
            data.push(memberPermissions);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all of your permissions!');
                })
                .catch(error => {
                    console.error(`Could not send permissions DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you!');
                });
        } else {
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    const memberPermissions = member.permissions.toArray();
            
                    data.push('Here\'s a list of your permissions:');

                    for (index = 0; index < memberPermissions.length; index++) { 
                        data.push(memberPermissions[index]);
                    }

                    return message.author.send(data, { split: true })
                        .then(() => {
                            if (message.channel.type === 'dm') return;
                            message.reply('I\'ve sent you a DM with all of your permissions!');
                        })
                        .catch(error => {
                            console.error(`Could not send permissions DM to ${message.author.tag}.\n`, error);
                            message.reply('It seems like I can\'t DM you!');
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this guild!");
                }
            } else {
                // Otherwise, if no user was mentioned
                message.reply("You didn't mention the user to ban!");
            }
        }
	},
};