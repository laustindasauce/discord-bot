module.exports = {
  name: "save-version",
  description: "Save the version to Redis database.",
  /**
   * This function will save the version with the currently available commands
   *
   * @param {Redis client} redis the Redis client (database)
   * @param {string} version the latest version
   * @param {Discord client} client
   */
  execute(redis, version, client) {
    // Add version to list of all versions
    redis.sadd("abspen1-Versions", version);

    // Set commands hash
    commandHash = "hash-" + version + "-commands";
    for (cmds of client.commands) {
      for (command of cmds) {
        if (command.name) {
          redis.hset(commandHash, command.name, command.description);
        }
      }
    }
  },
};
