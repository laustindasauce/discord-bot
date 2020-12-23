var Redis = require('ioredis')

const redisPass = process.env.REDIS_PASS
const redisHost = process.env.REDIS_HOST

var redis = new Redis({
    port: 6379,          // Redis port
    host: redisHost,   	 // Redis host
    password: redisPass, // Redis pass
    db: 9,				 // Redis database
})

module.exports = {
	name: 'decr-prof-count',
	description: 'Tag a member and decrease their profanity count.',
	usage: '[@member]',
	cooldown: 5,
	execute(message) {

		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (!message.mentions.users.size) {
				return message.reply('You need to tag a user in order to decrease their profanity count!');
			}

			const user = message.mentions.users.first();

			if (user) {
				const member = message.guild.member(user);
				// If the member is in the guild
				if (member) {
                    let title = member.user.username + "-prof-count";
                    redis.get(title).then((res) => {
						if (res > 0) {
							// Decrement the profanity count
                            redis.decr(title).then(() => {
								res--;
								message.reply(`Decrement was a success:\n${member.user.username} now has profanity count of ${res}`)
							}).catch(err => {
                                // An error happened
                                message.reply(`I was unable to edit ${member.user.username}'s profanity count`);
                                // Log the error
								console.error(err);
                            })
                        } else {
							// member doesn't have any profanity incidents
							message.reply(`${member.user.username} doesn't have any profanity incidents.`)
						}
					}).catch(err => {
						// An error happened
						message.reply(`I was unable to edit ${member.user.username}'s profanity count`);
						// Log the error
						console.error(err);
					});
				} else {
					// The mentioned user isn't in this guild
					message.reply(`${member.user.username} isn't in this guild!`);
				}
			// Otherwise, if no user was mentioned
			} else {
				message.reply("You didn't mention the user to edit!");
			}
		} else {
            // Otherwise, let the user know they don't have permission to edit this
            message.reply("You don't have permissions to decrease users' profanity count.\n<@&790612674106097754> can you check on this.")
        }
	},
};