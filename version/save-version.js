const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));


for (const file of functionFiles) {
	const func = require(`./functions/${file}`);
	client.functions.set(func.name, func);
}

module.exports = {
	name: 'save-version',
	description: 'Save the version to Redis database.',
	execute(redis, version) {
        redis.sadd('BotGuy-Versions', version);
        commandHash = "hash-" + version + "-commands";
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            redis.hset(commandHash, command.name, command.description);
        }
        functionHash = "hash-" + version + "-functions";
        for (const file of functionFiles) {
            const func = require(`./functions/${file}`);
            redis.hset(functionHash, func.name, func.description)
        }
	},
};