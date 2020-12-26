const { MessageEmbed } = require('discord.js')

module.exports = {
	name: "ping",
	aliases: ["🏓"],
	description: "Get the Ping the bot and the sender.",
	permLevel: 0,
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