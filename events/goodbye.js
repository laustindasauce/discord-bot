module.exports = {
	name: 'welcome',
	description: 'Display welcome message when a new member joins the server',
	/**
	 * This event listener is for when new members join the server
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {Discord Object} client the Discord client
	 */
	execute(member, Discord) {
		const goodbyeEmbed = new Discord.MessageEmbed()

        goodbyeEmbed.setColor('#f00000')
        goodbyeEmbed.setTitle('**' + member.user.username + '** was not the impostor there are **' + member.guild.memberCount + '** left Among Us')
        goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')

        member.guild.channels.cache.find(i => i.name === 'member-log').send(goodbyeEmbed)
        console.log(`Said goodbye to ${member.displayName}`)
	},
	test() {
		return true;
	},
};