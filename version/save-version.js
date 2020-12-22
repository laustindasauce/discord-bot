module.exports = {
	name: 'save-version',
	description: 'Save the version to Redis database.',
	execute(redis, version, client) {
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

        // Set functions hash
        functionHash = "hash-" + version + "-functions";
        for (cmds of client.functions) {
            for (func of cmds) {
                if (func.name) {
                    redis.hset(functionHash, func.name, func.description)
                }
            }
        }
	},
};