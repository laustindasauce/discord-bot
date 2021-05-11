const message = require("./message");

module.exports = {
	name: 'welcome',
	description: 'Display welcome message when a new member joins the guild',
	/**
	 * This event listener is for when new members join the guild
	 * 
	 * @param {member Object} member the member Object that is the new member that joined the guild
	 */
	execute(member) {
		// Send the message to a designated channel on a guild:
        // let channelID = '790611337545908306'
        // const channel = client.channels.cache.find(channel => channel.id === channelID)
        // Do nothing if the channel wasn't found on this guild
        // if (!channel) {
        //     console.log("Could not find channel to send welcome message")
        //     return;
        // }
        // Send the message, mentioning the member
        member.send(`Welcome to the Bot Testing server, ${member.displayName}. Send **!help** in the bot-testing channel or right here to see the commands you can send for me to do!`);
        console.log(`Welcomed ${member.displayName}`)
	},
	test() {
		return true;
	},
};