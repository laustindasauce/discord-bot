const fetch = require('node-fetch')

module.exports = {
    name: 'gif',
    aliases: ['video', 'vid'],
    description: 'Send a specified gif. Add arguments if you\'d like!',
    usage: '[**optional** search parameter]',
    permLevel: 0,
    execut: async (message, args, _redis, _level) => {
        let keywords = 'happy'
        if (args.length) {
            keywords = args.join(' ')
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=off`
        let response = await fetch(url)
        let json = await response.json()
        const index = Math.floor(Math.random() * json.results.length)
        message.channel.send(json.results[index].url)
        console.log(`${keywords} gif sent!`)
    },
    test() {
		return true;
	},
};