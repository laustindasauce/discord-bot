const testing = require('../test/test.js');

module.exports = {
  name: "test",
  aliases: ['testing', 'tests'],
  description: "Run tests and present each function or the specified function as passing or failed.",
  args: false,
  readOnly: false,
  guildOnly: false,
  cooldown: 5,
  permLevel: 8,
  usage: '[*optional* command name]',
  /**
	 * This command is able to call test.js and run the test command from
   * '../test/test.js'
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
  execute(message, args, _redis, _level) {
    testing.execute(message, args).then(() => {
      console.log('Finished testing');
    }).catch((err) => {
      console.error(err);
    });
  },
    test() {
    return true;
  },
};