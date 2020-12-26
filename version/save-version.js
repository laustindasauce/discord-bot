module.exports = {
	name: 'save-version',
	description: 'Save the version to Redis database.',
	execute(redis, version, client) {
        // Add version to list of all versions
        redis.sadd('BotGuy-Versions', version);

        // Set commands hash
        commandHash = "hash-" + version + "-commands";
        for (cmds of client.commands) {
            for (command of cmds) {
                if (command.name) {
                    redis.hset(commandHash, command.name, command.description);
                }
            }
        }
	},
};