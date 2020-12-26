module.exports = {
    name: "profanity-filter",
    aliases: ['bad-words', 'filter', 'language', 'profanity'],
    description: `\`READ ONLY\`\nThis function is always running and is a profanity filter for the server.`,
    readOnly: true,
    permLevel: 0,
    test() {
		return true;
	},
};