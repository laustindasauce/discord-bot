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
    // const channel = "852211870378098751";

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
  },
  test() {
    return true;
  },
};
