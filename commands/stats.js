const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "stats",
  aliases: ["server-stats", "stat"],
  description: "Gives some useful bot statistics",
  args: false,
  readOnly: false,
  channels: ["bot-commands"],
  guildOnly: true,
  cooldown: 5,
  permLevel: 0,
  /**
   * This command is able to pretty print some stats for the current server and
   * the bots dependencies
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {array} _args the rest of the message after the command
   * @param {Redis client} _redis Redis client (our database)
   * @param {num} _level users permission level
   */
  execute(message, _args, redis, _level) {
    const duration = moment
      .duration(message.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    redis
      .get("botguy-version")
      .then((result) => {
        message.channel.send(
          `= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: ${message.client.users.cache.size.toLocaleString()}
			• Servers    :: ${message.client.guilds.cache.size.toLocaleString()}
			• Channels   :: ${message.client.channels.cache.size.toLocaleString()}
			• Discord.js :: v${version}
			• Node       :: ${process.version}
			• BotGuy	 :: v${result}`,
          { code: "asciidoc" }
        );
      })
      .catch((_err) => {
        message.channel.send(
          `= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: ${message.client.users.cache.size.toLocaleString()}
			• Servers    :: ${message.client.guilds.cache.size.toLocaleString()}
			• Channels   :: ${message.client.channels.cache.size.toLocaleString()}
			• Discord.js :: v${version}
			• Node       :: ${process.version}`,
          { code: "asciidoc" }
        );
      });
  },
  test() {
    return true;
  },
};
