const { Message } = require("discord.js");

module.exports = {
  name: "message",
  description: "message event handler.",
  /**
   * This is the event handler for when a message is sent in the guild
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {Discord Object} client the Discord client
   */
  execute(message, Discord, client, redis, prefix, cooldowns) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    const level = client.permlevel(message);

    if (!command) return message.reply(`${args} is not a command!`);

    if (command.readOnly)
      return message.reply(
        `Sorry, the command \`${command.name}\` is read only!`
      );

    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply(`I can't execute \`${command.name}\` inside DMs!`);
    }

    if (
      command.channels &&
      !command.channels.includes(message.channel.name && command.guildOnly)
    ) {
      console.log(`guildOnly: ${command.guildOnly}`);
      return message.reply(
        `I can only execute \`${command.name}\` in the channel \`${command.channels}\`!`
      );
    }

    if (command.args && !args.length) {
      let reply = `you didn't provide any arguments!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.reply(reply);
    }

    if (level < command.permLevel)
      return message.reply(
        `you don't have permissions to run \`${command.name}\` command.`
      );

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait **${timeLeft.toFixed(
            1
          )}** more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args, redis, level);
    } catch (error) {
      console.error(error);
      message.reply(
        `sorry, there was an error trying to execute \`${command.name}.\` \nPlease contact admin if issue persists.`
      );
    }
  },
  test() {
    return true;
  },
};
