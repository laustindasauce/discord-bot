/**
 * This function pulled from https://github.com/DisStreamChat/Backend
 * Credit to them for this awesome command!
 */
 module.exports = {
	name: "version-check",
	description: "Check to see if there are any added commands",
	/**
	 * This command is a not-so-simple call and response command
	 * This is able to display the ping of the bot, and member.
	 * Also displays overall ping
	 * 
	 * @param {Redis client} redis Redis client (our database)
	 * @param {Discord client} client
	 */
	execute: async (redis, client) => {
        const version = await redis.get('botguy-version')

		commandHash = "hash-" + version + "-commands";


        let data = [];
        let data2 = [];

        let hash = null;
        
        try {
            hash = await redis.hgetall(commandHash)
        } catch (error) {
            // Some error
        }
        
        if (hash !== null) {
            let entries = Object.entries(hash)
            let i = 0;
            for (var [name, _description] of entries) {
                data.push(`${name}`);
            }
        } else {
            console.log('Hash is null');
            return false;
        }

        for (cmds of client.commands) {
            for (command of cmds) {
                if (command.name) {
                    data2.push(command.name)
                }
            }
        }

        data = data.sort();
        data2 = data2.sort();
        const res = !(JSON.stringify(data)==JSON.stringify(data2));
        return res
	},
};