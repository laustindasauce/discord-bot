const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'server',
	aliases: ['guild', 'serverinfo', 'server-info'],
	description: 'Display info about this server.',
	args: false,
	readOnly: false,
	channels: ['bot-testing'],
	guildOnly: true,
	cooldown: 3,
	permLevel: 0,
	/**
	 * This command is able to return some cool facts about the server the message
	 * was sent in
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute: async (message, _args, _redis, _level) => {
		const guild = message.guild;
		const owner = guild.owner;

		const embed = new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setTitle(`Info about ${guild.name}`)
			.addField("Owner", owner, true)
			.addField("Partnered", guild.partnered ? "Yes" : "No", true)
			.addField("Region", guild.region, true)
			.addField("Categories", [...new Set(guild.channels.cache.array().map(channel => channel.parentID))].length, true)
			.addField("Text Channels", guild.channels.cache.array().filter(channel => channel.type === "text").length, true)
			.addField("Voice Channels", guild.channels.cache.array().filter(channel => channel.type === "voice").length, true)
			.addField("Members", guild.memberCount, true)
			.addField(
				`Roles - ${guild.roles.cache.array().length}`,
				guild.roles.cache
					.array()
					.filter(role => !role.managed && role.name !== "@everyone")
					.sort((a, b) => b.rawPosition - a.rawPosition)
					.join(", ")
			)
			.setFooter(`ID: ${guild.id} | Server Created`)
			.setTimestamp(guild.createdAt);

		message.channel.send(embed);
	},
	test() {
		return true;
	},
};