const getUserFromMention = require("../utils/functions/getUserFromMention.js");

module.exports = {
  name: "ban",
  description: "Tag a member and ban them.",
  usage: "[@member] reason the user needs banned",
  args: true,
  readOnly: false,
  guildOnly: true,
  cooldown: 3,
  permLevel: 4,
  /**
   * This command is able to return the ban the tagged user
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {array} args the rest of the message after the command
   * @param {Redis client} _redis Redis client (our database)
   * @param {num} _level users permission level
   */
  execute(message, args, _redis, _level) {
    if (!message.mentions.users.size) {
      return message.reply("you need to tag a user in order to ban them!");
    }

    const user = getUserFromMention.execute(args[0], message.client);
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // Get the reason for the ban from the command
      const reason = args.slice(1).join(" ");
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: reason,
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${member.displayName}`);
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply(`I was unable to ban ${member.displayName}`);
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        return message.reply(`${member.displayName} isn't in this guild!`);
      }
    } else {
      // Otherwise, if no user was mentioned
      return message.reply(
        "Please use a proper mention if you want to ban someone."
      );
    }
  },
  test() {
    return true;
  },
};
