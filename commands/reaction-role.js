const Discord = require("discord.js");
const roleEmbed = new Discord.MessageEmbed();
/**
 * This function will allow users to react to get a role
 */
module.exports = {
  name: "reaction-role",
  aliases: ["react"],
  description: "Send message that allows users to react to get a role.",
  args: false,
  readOnly: false,
  channels: ["roles"],
  guildOnly: true,
  cooldown: 3,
  permLevel: 10,
  /**
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {client} object Discord client object
   */
  execute: async (message, client) => {
    const channel = "852211870378098751";

    // Roles
    const videoGamesRole = message.guild.roles.cache.find(
      (role) => role.name === "Video Games"
    );
    const boardGamesRole = message.guild.roles.cache.find(
      (role) => role.name === "Board Games"
    );
    const TVSeriesRole = message.guild.roles.cache.find(
      (role) => role.name === "TV Series"
    );
    const moviesRole = message.guild.roles.cache.find(
      (role) => role.name === "Movies"
    );
    const sportsRole = message.guild.roles.cache.find(
      (role) => role.name === "Sports"
    );
    const phoenixRole = message.guild.roles.cache.find(
      (role) => role.name === "Phoenix"
    );
    const planoRole = message.guild.roles.cache.find(
      (role) => role.name === "Plano"
    );
    const sanAntonioRole = message.guild.roles.cache.find(
      (role) => role.name === "San Antonio"
    );
    const tampaRole = message.guild.roles.cache.find(
      (role) => role.name === "Tampa"
    );
    const coloradoSpringsRole = message.guild.roles.cache.find(
      (role) => role.name === "Colorado Springs"
    );

    // Emojis

    const videoGamesRoleEmoji = "🎮";
    const boardGamesRoleEmoji = "🎲";
    const TVSeriesRoleEmoji = "📺";
    const moviesRoleEmoji = "🎥";
    const sportsRoleEmoji = "🏀";
    const phoenixRoleEmoji = "🌵";
    const planoRoleEmoji = "✈️";
    const sanAntonioRoleEmoji = "😄";
    const tampaRoleEmoji = "🏖️";
    const coloradoSpringsRoleEmoji = "🏔️";

    roleEmbed.setColor("#e42643");
    roleEmbed.setTitle("**Role Menu: Internship Area**");
    roleEmbed.setDescription("React to give yourself a role!");
    roleEmbed.addFields(
      { name: videoGamesRoleEmoji, value: "Video Games", inline: true },
      { name: boardGamesRoleEmoji, value: "Board Games", inline: true },
      { name: TVSeriesRoleEmoji, value: "TV Series", inline: true },
      { name: moviesRoleEmoji, value: "Movies", inline: true },
      { name: sportsRoleEmoji, value: "Sports", inline: true },
      { name: phoenixRoleEmoji, value: "Phoenix", inline: true },
      { name: planoRoleEmoji, value: "Plano", inline: true },
      { name: sanAntonioRoleEmoji, value: "San Antonio", inline: true },
      { name: tampaRoleEmoji, value: "Tampa", inline: true },
      {
        name: coloradoSpringsRoleEmoji,
        value: "Colorado Springs",
        inline: true,
      }
    );

    let messageEmbed = await message.channel.send(roleEmbed);
    messageEmbed.react(videoGamesRoleEmoji);
    messageEmbed.react(boardGamesRoleEmoji);
    messageEmbed.react(TVSeriesRoleEmoji);
    messageEmbed.react(moviesRoleEmoji);
    messageEmbed.react(sportsRoleEmoji);
    messageEmbed.react(phoenixRoleEmoji);
    messageEmbed.react(planoRoleEmoji);
    messageEmbed.react(sanAntonioRoleEmoji);
    messageEmbed.react(tampaRoleEmoji);
    messageEmbed.react(coloradoSpringsRoleEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      console.log("Reaction added");
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) {
        console.log("By bot");
        return;
      }
      if (!reaction.message.guild) return;

      console.log("WE got here!");

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === videoGamesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(videoGamesRole);
        }
        if (reaction.emoji.name === boardGamesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(boardGamesRole);
        }
        if (reaction.emoji.name === TVSeriesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(TVSeriesRole);
        }
        if (reaction.emoji.name === moviesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(moviesRole);
        }
        if (reaction.emoji.name === sportsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(sportsRole);
        }
        if (reaction.emoji.name === phoenixRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(phoenixRole);
        }
        if (reaction.emoji.name === planoRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(planoRole);
        }
        if (reaction.emoji.name === sanAntonioRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(sanAntonioRole);
        }
        if (reaction.emoji.name === tampaRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(tampaRole);
        }
        if (reaction.emoji.name === coloradoSpringsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(coloradoSpringsRole);
        }
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === videoGamesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(videoGamesRole);
        }
        if (reaction.emoji.name === boardGamesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(boardGamesRole);
        }
        if (reaction.emoji.name === TVSeriesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(TVSeriesRole);
        }
        if (reaction.emoji.name === moviesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(moviesRole);
        }
        if (reaction.emoji.name === sportsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(sportsRole);
        }
        if (reaction.emoji.name === phoenixRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(phoenixRole);
        }
        if (reaction.emoji.name === planoRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(planoRole);
        }
        if (reaction.emoji.name === sanAntonioRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(sanAntonioRole);
        }
        if (reaction.emoji.name === tampaRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(tampaRole);
        }
        if (reaction.emoji.name === coloradoSpringsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(coloradoSpringsRole);
        }
      }
    });
  },
  test() {
    return true;
  },
};
