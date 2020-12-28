const correctFormat = require('../utils/functions/correctFormat.js')

module.exports = {
	name: 'remind',
	aliases: ['remindme', 'reminder', 'remind-me'],
    description: 'Remind is able to remind you via email, dm, ' +
        'or reply in same channel a unique reminder and a specific' +
        ' time from now. I recommend using email/dm if reminder is a ' +
        'long time from now in case the channel is removed.',
        usage: '[number 1-99]',
	args: true,
	readOnly: false,
	guildOnly: false,
	permLevel: 0,
	/**
	 * This command is a simple call and response
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
    execute(message, args, redis, _level) {
        if (args[0] !== 'email' && args[0] !== 'dm' && args[0] !== 'reply') {
            message.reply('please be sure that you choose either email, dm, or reply as your first argument after !remind');
        }
        const correctForm = correctFormat.execute(args[1]);
        if (correctForm !== 'Passing') return message.reply(`please be sure to use correct format -> \`yy/mm/dd/hh/mm\`. Resolve: ${correctForm}`);

        return message.reply("currently working on this function!")
	},
	test() {
		return true;
	},
};