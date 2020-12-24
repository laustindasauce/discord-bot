module.exports = {
	name: 'ping',
	description: 'Simple check for if the bot is functioning',
	cooldown: 5,
	test() {
		return true;
	},
};

module.exports.execute = async (client, redis, message) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
};