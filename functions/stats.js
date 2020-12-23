const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: "stats",
	description: "Gives some useful bot statistics",
	execute(client, redis, message) {
		const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
		redis.get('botguy-version').then((result) => {
			message.channel.send(`= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: ${client.users.cache.size.toLocaleString()}
			• Servers    :: ${client.guilds.cache.size.toLocaleString()}
			• Channels   :: ${client.channels.cache.size.toLocaleString()}
			• Discord.js :: v${version}
			• Node       :: ${process.version}
			• BotGuy	 :: v${result}`, {code: "asciidoc"});
		}).catch((err) => {
			message.channel.send(`= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: ${client.users.cache.size.toLocaleString()}
			• Servers    :: ${client.guilds.cache.size.toLocaleString()}
			• Channels   :: ${client.channels.cache.size.toLocaleString()}
			• Discord.js :: v${version}
			• Node       :: ${process.version}`, {code: "asciidoc"});
		});
		
	}
}