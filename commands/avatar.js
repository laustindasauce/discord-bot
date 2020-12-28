const getUserFromMention = require('../utils/functions/getUserFromMention.js')

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
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
		if (args[0]) {
			const user = getUserFromMention.execute(args[0], message.client);
			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone elses avatar.');
			}
			return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}
		return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
	},
	test() {
		return true;
	},
};