module.exports = {
	name: 'server',
	aliases: ['guild'],
	description: 'Display info about this server.',
	guildOnly: true,
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
	test() {
		return true;
	},
};