module.exports = {
  name: "version-check",
  description: "Check to see if there are any added commands",
  /**
   * This is a helper function that will check to see if there are any added / removed
   * commands from the current version of the bot to now
   *
   * If there are differences in the commands then return true which will update the version
   * If not return false which will keep the version from updating
   *
   * @param {Redis client} redis Redis client (our database)
   * @param {Discord client} client
   */
  execute: async (redis, client) => {
    const version = await redis.get("botguy-version");

    commandHash = "hash-" + version + "-commands";

    let data = [];
    let data2 = [];

    let hash = null;

    try {
      hash = await redis.hgetall(commandHash);
    } catch (error) {
      // Some error
    }

    if (hash !== null) {
      let entries = Object.entries(hash);
      let i = 0;
      for (var [name, _description] of entries) {
        data.push(`${name}`);
      }
    } else {
      console.log("Hash is null");
      return false;
    }

    for (cmds of client.commands) {
      for (command of cmds) {
        if (command.name) {
          data2.push(command.name);
        }
      }
    }

    data = data.sort();
    data2 = data2.sort();
    const res = !(JSON.stringify(data) == JSON.stringify(data2));
    return res;
  },
};
