const { MessageEmbed } = require("discord.js");
const getUserFromMention = require('../utils/functions/getUserFromMention.js');
const formatDistanceToNow = require("date-fns/formatDistanceToNow");

const formatFromNow = time => formatDistanceToNow(time, { addSuffix: true });

module.exports = {
	name: 'user-info',
	aliases: ['info'],
	description: 'Display info about yourself or other server members.',
	usage: '@member be sure to tag the member directly after the command if you tag someone.',
	args: false,
	readOnly: false,
	channel: 'bot-testing',
	guildOnly: false,
	cooldown: 5,
	permLevel: 0,
	/**
	 * This command is able to give some basic user-information of the member tagged 
	 * or the member who sent the message if no one is tagged
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} level users permission level
	 */
	execute: async (message, args, _redis, level) => {
		const user = getUserFromMention.execute(args[0], message.client);
		let member = message.guild.member(user);
		let friendly = null;
		if (args.length === 0) {
			({ member } = message);
			friendly = message.client.config.permLevels.find(l => l.level === level).name;
		}
		if (!member) return await message.channel.send("This user can't be found. Try **!help info** and double check usage.");

		const status = {
			online: `:green_circle: User is online!`,
			idle: `:yellow_circle: User is idle`,
			offline: `:black_circle: User is offline`,
			dnd: `:red_circle: User doesn't want to be disturbed right now`,
        };
        
		const game = member.presence.game ? member.presence.game.name : "Not playing a game";
        
        const createdAt = formatFromNow(member.user.createdAt, {
			addSuffix: true,
        });
        
		const joinedAt = formatFromNow(member.joinedAt, { addSuffix: true });
		let roles = "This user has no roles";
        let size = 0;
        
		if (member.roles.cache.size !== 1) {
			// don't show the @everyone role
			roles = member.roles.cache.filter(role => role.name !== "@everyone");
			({ size } = roles);
			if (roles.size !== 1) {
				roles = `${roles
					.array()
					.slice(0, -1)
					.map(r => r)
					.join(", ")} and ${roles.last()}`;
			} else {
				roles = roles.first();
			}
		}



		const embed = new MessageEmbed()
			.setAuthor(member.displayName, member.user.displayAvatarURL())
			.setThumbnail(member.user.displayAvatarURL())
			.setTitle(`Information about ${member.displayName}`)
			.setDescription(status[member.presence.status])
			.addField("Username", member.user.username, true)
			.addField(`Playing`, game, true)
			.addField("Account created", createdAt, true)
			.addField("Joined the server", joinedAt)
			.addField(`Roles - ${size}`, `${roles}`, true)
            .setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)
            .setFooter(`ID: ${member.id}`)
			.setTimestamp(new Date())
		if (friendly) embed.addField('Your permission level is:', `${level} - ${friendly}`, true);
		message.channel.send(embed);
	},
};