module.exports = {
	name: "my-level",
	aliases: ['mylevel'],
    description: "Tells you your permission level for the current message location.",
    permLevel: "User",
	execute(client, redis, message, args, level) {
		const friendly = client.config.permLevels.find(l => l.level === level).name;
        message.reply(`Your permission level is: ${level} - ${friendly}`);
	},
	test() {
		return true;
	},
};