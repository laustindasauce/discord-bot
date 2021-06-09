const Redis = require("ioredis");
const save_version = require("./save-version.js");
const check_version = require("./check-version.js");

const redisPass = process.env.REDIS_PASS;
const redisHost = process.env.REDIS_HOST;

let version = 1;
let mod1 = 0;
let mod2 = 0;

const redis = new Redis({
  port: 6379, // Redis port
  host: redisHost, // Redis host
  password: redisPass, // Redis pass
  db: 9, // Redis database
});

/**
 *
 * @param {Discord client} client
 * @param {boolean} test true or false whether this is run in test environment or not
 */
async function get_version(client, test) {
  // Get latest version from database
  await redis.get("version").then((res) => {
    if (res) {
      version = res;
    }
    redis.get("mod1").then((res2) => {
      if (res2) {
        mod1 = res2;
      }
      redis.get("mod2").then((res3) => {
        if (res3) {
          mod2 = res3;
        }
        if (mod2 < 9) {
          redis.incr("mod2");
          mod2++;
        } else {
          if (mod1 < 9) {
            redis.incr("mod1");
            redis.set("mod2", "0");
            mod2 = 0;
            mod1++;
          } else {
            redis.set("mod2", "0");
            redis.set("mod1", "0");
            redis.incr("version");
            mod1 = 0;
            mod2 = 0;
            version++;
          }
        }
        let to_string = `${version}.${mod1}.${mod2}`;
        save_version.execute(redis, to_string, client);
        redis.set("botguy-version", to_string);
        if (test) return console.log(to_string);
        let channelID = "790960191792873573";
        const channel = client.channels.cache.find(
          (channel) => channel.id === channelID
        );
        channel.send(to_string);
      });
    });
  });
}

module.exports = {
  name: "version",
  description: "Update application version with each GitHub push.",
  execute: async (client, test) => {
    const version = await redis.get("botguy-version");
    let updates;
    if (!version) {
      updates = true;
    } else {
      updates = await check_version.execute(redis, client);
    }
    if (updates) {
      get_version(client, test).then(() =>
        console.log("Successfully updated version.")
      );
    } else {
      const version = await redis.get("botguy-version");

      save_version.execute(redis, version, client);
      console.log("Successfully saved current version.");
      console.log(version);
    }
  },
};
