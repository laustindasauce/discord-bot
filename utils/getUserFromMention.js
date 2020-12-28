module.exports = {
	name: 'getUserFromMention',
	description: 'Checks arguments after ![command] to see if there is a tagged member',
	/**
	 * This command is a simple call and response
	 * 
	 * @param {string} mention argument directly after command with potential tagged member
	 */
	execute(mention, client) {
		if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }

            return client.users.cache.get(mention);
        }
	},
	test() {
		return true;
	},
};