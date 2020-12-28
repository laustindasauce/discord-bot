module.exports = {
	name: "my-level",
	aliases: ['mylevel'],
	description: "Tells you your permission level for the current message location.",
	args: false,
	readOnly: false,
	guildOnly: false,
	cooldown: 3,
	permLevel: 0,
	/**
	 * This command is able to send the level of the user who sent the message
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} level users permission level
	 */
	execute(message, _args, _redis, level) {
		const friendly = message.client.config.permLevels.find(l => l.level === level).name;
        message.reply(`Your permission level is: ${level} - ${friendly}`);
	},
	test() {
		return true;
	},
};