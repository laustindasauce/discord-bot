const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Levels available in this server')
    .setAuthor('BotGuy', 'https://discord.com/channels/@me/790100058682294302/791705870567604264', 'https://discord.js.org')
    .setTimestamp()
	.setFooter('Try running \`!my-level\` to see your permission level.', 'https://discord.bots.gg/img/logo_transparent_coloured.png');

module.exports = {
    name: "level",
    aliases: ['levels'],
    description: "Displays embedded message with all available permission levels in the server.",
    args: false,
    readOnly: false,
    channels: ['bot-testing'],
    guildOnly: false,
    cooldown: 2,
    permLevel: 0,
    /**
	 * This command is able to give all available levels to each server member
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute(message, _args, _redis, _level) {
		for (let i = message.client.config.permLevels.length-1; i >= 0; i--) {
            const thisLevel = message.client.config.permLevels[i];
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
    },
    test() {
		return true;
	},
};