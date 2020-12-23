const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()

module.exports = {
    name: "level",
    aliases: ['levels'],
    description: "Displays embedded message with all available levels in the server.",
    permLevel: "User",
	execute(client) {
		for (let i = client.config.permLevels.length; i > 0; i--) {
            const thisLevel = client.config.permLevels[i];
            embed.addField(thisLevel.name, thisLevel, false)
        }
        return message.author.send(exampleEmbed)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with the available levels for this server!');
            })
            .catch(error => {
                console.error(`Could not send levels DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you!');
            });
	}
};