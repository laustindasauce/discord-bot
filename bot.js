var Redis = require("ioredis");
const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.js");

const client = new Discord.Client({
  ws: {
    intents: config.intents,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.config = config;

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var version = require("./version/version.js");
var messageEvent = require("./events/message.js");
// var welcomeEvent = require("./events/welcome.js");
// var goodbyeEvent = require("./events/goodbye.js");

/**
 * Retrieve all environment variables as constant values
 */
// const token = process.env.TOKEN
// const public = process.env.PUBLIC
// const bot_id = process.env.BOT_ID
// const secret = process.env.SECRET
const redisPass = client.config.redisPass;
const redisHost = client.config.redisHost;

var redis = new Redis({
  port: 6379, // Redis port
  host: redisHost, // Redis host
  password: redisPass, // Redis pass
  db: 10, // Redis database
});

const cooldowns = new Discord.Collection();
var prefix = client.config.defaultSettings.prefix;

redis.set("check-redis", "Redis is running!");
redis.get("check-redis").then((res) => console.log(res));

// redis.set("botguy-version", "1.0.0");
// redis.del("mod1");
// redis.del("mod2");
// redis.del("version");
// redis.del("BotGuy-Versions");
/**
 * Runs once when the client initially gets set up
 */
client.once("ready", () => {
  console.log("Bot has logged in successfully!");
  /** Local redis has test as the value, and kubernetes redis has live as the value */
  redis.get("botguy-env").then((res) => {
    if (res !== "test") {
      version.execute(client, false);
    } else {
      version.execute(client, true);
      console.log("**************\nTest Env Active\n**************");
      prefix = client.config.defaultSettings.testPrefix;
      test_env = true;
    }
  });
});

/**
 * Event listener for when a message is sent in the guild
 */
client.on("message", (message) => {
  messageEvent.execute(message, Discord, client, redis, prefix, cooldowns);
});

/**
 * Event listener for when a user joins the guild
 * Sends message to let them know how to interact with the bot
 */
// client.on("guildMemberAdd", (member) => {
//   welcomeEvent.execute(member);
// });

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

client.on("messageReactionAdd", async (reaction, user) => {
  console.log("Reaction added");
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) {
    console.log("by bot");
    return;
  }
  if (!reaction.message.guild) return;

  console.log("WE got here!");

  if (reaction.message.channel.id == "852211870378098751") {
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

  if (reaction.message.channel.id == "852211870378098751") {
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

/**
 * Send a funny message when a user leaves the guild
 */
// client.on("guildMemberRemove", (member) => {
//   goodbyeEvent.execute(member, Discord);
// });

/**
 * Not sure what I can do with this event yet
 */
// client.on("presenceUpdate", function(oldMember, newMember){
//     console.log(`a guild member's presence changes`);
// });

/**
 * This function is ran once at start to initialize the guild
 */
const init = async () => {
  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.permlevel = (message) => {
    let permlvl = 10;

    const permOrder = client.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;

      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        return permlvl;
      }
    }
  };

  client.login(client.config.token);
};

init();
