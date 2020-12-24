module.exports = {
    name: "test",
    aliases: ['testing', 'tests'],
    description: "Run tests and present each function or the specified function as passing or failed.  \`Only available in test environment\`",
    permLevel: "Bot Support",
    test: true,
    usage: '[all] OR [command name]',
    test() {
		return true;
	},
};