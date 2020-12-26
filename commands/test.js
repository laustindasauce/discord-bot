const testing = require('../test/test.js');

module.exports = {
  name: "test",
  aliases: ['testing', 'tests'],
  description: "Run tests and present each function or the specified function as passing or failed.  \`Only available in test environment\`",
  permLevel: 8,
  usage: '[*optional* command name]',
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