module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	usage: '[*optional* @member]',
	args: false,
	readOnly: false,
	cooldown: 2,
	permLevel: 0,
	/**
	 * This command is able to return the avatar of the user or a tagged member
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the specific version the user wants to see
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
	test() {
		return true;
	},
};