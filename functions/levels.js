const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Levels available in this server')
    .setAuthor('BotGuy', 'https://discord.bots.gg/img/logo_transparent_coloured.png', 'https://discord.js.org')
    .setTimestamp()
	.setFooter('Try running \`!my-level\` to see your permission level.', 'https://discord.bots.gg/img/logo_transparent_coloured.png');

module.exports = {
    name: "level",
    aliases: ['levels'],
    description: "Displays embedded message with all available permission levels in the server.",
    permLevel: "User",
	execute(client, redis, message) {
		for (let i = client.config.permLevels.length-1; i >= 0; i--) {
            const thisLevel = client.config.permLevels[i];
            embed.addField( `\tLevel: ${thisLevel.level}\t{${thisLevel.name}}`, `\tDescription: ${thisLevel.description}`, false)
        }
        return message.author.send(embed)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with the available permission levels for this server!');
            })
            .catch(error => {
                console.error(`Could not send permission levels DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you!');
            });
	}
};