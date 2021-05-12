const { MessageEmbed } = require('discord.js')
/**
 * This function pulled from https://github.com/DisStreamChat/Backend
 * Credit to them for this awesome command!
 */
module.exports = {
	name: "ping",
	aliases: ["🏓"],
	description: "Get the Ping the bot and the sender.",
	args: false,
	readOnly: false,
	channel: 'bot-testing',
	guildOnly: false,
	cooldown: 3,
	permLevel: 0,
	/**
	 * This command is a not-so-simple call and response command
	 * This is able to display the ping of the bot, and member.
	 * Also displays overall ping
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute: async (message, _args, _redis, _level) => {
		message.react("🏓");
		let Pinging = new MessageEmbed()
			.setTitle(`🏓 Pinging...`)

		const msg = await message.channel.send(Pinging);
		let pingembed = new MessageEmbed()
			.setTitle(`🏓 Pong!`)
			.addFields(
				{ name: `**Ping:**`, value: `${Math.floor(msg.createdAt - message.createdAt)}ms` },
				{ name: `${message.client.user.username}'s Ping:`, value: `${Math.round(message.client.ws.ping)}ms` },
				{ name: `${message.author.username}'s Ping:`, value: `${Math.abs(Math.floor((msg.createdAt - message.createdAt) - message.client.ws.ping))}ms` },
			)

		msg.edit(pingembed)
	},
	test() {
		return true;
	},
};