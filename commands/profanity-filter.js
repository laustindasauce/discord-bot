module.exports = {
    name: "profanity-filter",
    aliases: ['bad-words', 'filter', 'language', 'profanity'],
    description: `\`READ ONLY\`\nThis function is always running and is a profanity filter for the server.`,
    args: false,
    readOnly: true,
    guildOnly: false,
    cooldown: 1,
    permLevel: 0,
    test() {
		return true;
	},
};