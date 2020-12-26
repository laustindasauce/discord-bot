module.exports = {
	name: "my-level",
	aliases: ['mylevel'],
    description: "Tells you your permission level for the current message location.",
    permLevel: 0,
	execute(message, _args, _redis, level) {
		const friendly = message.client.config.permLevels.find(l => l.level === level).name;
        message.reply(`Your permission level is: ${level} - ${friendly}`);
	},
	test() {
		return true;
	},
};