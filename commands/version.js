const Discord = require("discord.js");
const exampleEmbed = new Discord.MessageEmbed()
  .setColor("#ff2052")
  .setAuthor(
    "abspen1",
    "https://discord.com/channels/@me/790100058682294302/791705870567604264",
    "https://discord.js.org"
  );

/**
 * This is the version command
 * Possible parameters of ex: '1.0.1' -- all -- latest
 *
 * This command is to show the progress of the bot over time
 * Each time the bot is restarted it will increment the version
 *
 * This function has a large cooldown since it is interacting with redis and if looking
 * for a specific version can be heavyish computation
 */
module.exports = {
  name: "version",
  aliases: ["versions", "v"],
  description: "Give insight into the versions of abspen1 BOT.",
  usage: "[specific version] OR [all] OR [latest]",
  args: false,
  readOnly: false,
  channels: ["bot-testing"],
  guildOnly: false,
  cooldown: 20,
  permLevel: 0,
  /**
   * Checks the argument to see which function to call
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {array} args the specific version the user wants to see
   * @param {Redis client} redis Redis client (our database)
   * @param {num} _level users permission level
   */
  execute(message, args, redis, _level) {
    versions = args.join(" ");

    if (versions === "all") {
      get_versions(message, redis).then(() =>
        console.log(`DM sent with all available versions.`)
      );
    } else if (versions === "latest") {
      redis.get("botguy-version").then((res) => {
        return message
          .reply(`the latest version is v${res}`)
          .then(() => {
            console.log("Replied with latest version of abspen1Alt.");
          })
          .catch((error) => {
            console.error(
              `Could not send version reply to ${message.author.tag}.\n`,
              error
            );
          });
      });
    } else {
      get_hash(message, args, redis).then(() =>
        console.log(`DM sent with info on version.`)
      );
    }
  },
  test() {
    return true;
  },
};

/**
 * This function is called when the user enters a specific version they'd like to see
 *
 * @param {message Object} message the message Object that was sent to trigger this command
 * @param {string} args the specific version the user wants to see
 * @param {Redis client} redis Redis client (our database)
 */
async function get_hash(message, args, redis) {
  commandHash = "hash-" + args.join(" ") + "-commands";

  exampleEmbed.setTitle(`v${args}`);
  exampleEmbed.setDescription(
    `**Modules available to abspen1 as of v${args}**`
  );

  let data = [];

  let hash = null;

  try {
    hash = await redis.hgetall(commandHash);
  } catch (error) {}

  if (hash !== null) {
    let entries = Object.entries(hash);
    let i = 0;
    for (var [name, description] of entries) {
      // if (i === 0) {
      // 	exampleEmbed.setTitle(` AS OF VERSION ${args}`);
      // 	data.push("= Commands =\n");
      // 	i = 1;
      // }
      data.push(`• ${name} :: ${description}\n`);
      exampleEmbed.addField(name, description, true);
    }
  }

  if (!data.length) {
    data.push(`${args} is not a valid version of abspen1`);
    data.push("Try the command !version all");
    return message.author
      .send(data, { split: true })
      .then(() => {
        if (message.channel.type === "dm") return;
        message.reply("I've sent you a DM with the version details!");
      })
      .catch((error) => {
        console.error(
          `Could not send version DM to ${message.author.tag}.\n`,
          error
        );
        message.reply("it seems like I can't DM you!");
      });
  }

  exampleEmbed.setTimestamp();
  exampleEmbed.setFooter(
    "To run a command send => **![command name]**",
    "https://discord.bots.gg/img/logo_transparent_coloured.png"
  );

  return message.author
    .send(exampleEmbed)
    .then(() => {
      if (message.channel.type === "dm") return;
      message.reply("I've sent you a DM with the version details!");
    })
    .catch((error) => {
      console.error(
        `Could not send version DM to ${message.author.tag}.\n`,
        error
      );
      message.reply("it seems like I can't DM you!");
    });
}

/**
 *
 * @param {message Object} message the message Object that was sent to trigger this command
 * @param {Redis client} redis Redis client (our database)
 */
async function get_versions(message, redis) {
  let data = [];

  data.push("Here are all versions for abspen1:");
  arr = await redis.smembers("BotGuy-Versions");

  // for (let i = 0; i < arr.length; i++) {
  // 	data.push(arr[i]);
  // }
  data.push("Versions go from 1.0.9 => 1.1.0 and 1.9.9 => 2.0.0");

  const version = await redis.get("botguy-version");

  const to_string = `**1.0.1 => ${version}**`;

  data.push(to_string);

  return message.author
    .send(data, { split: true })
    .then(() => {
      if (message.channel.type === "dm") return;
      message.reply("I've sent you a DM with all versions!");
    })
    .catch((error) => {
      console.error(
        `Could not send versions DM to ${message.author.tag}.\n`,
        error
      );
      message.reply("it seems like I can't DM you!");
    });
}
