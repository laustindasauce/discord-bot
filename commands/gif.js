const fetch = require('node-fetch')

async function get_gif(message, args) {
    let keywords = 'happy'
    if (args) {
        keywords = args.join(' ')
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=off`
    let response = await fetch(url)
    let json = await response.json()
    const index = Math.floor(Math.random() * json.results.length)
    message.channel.send(json.results[index].url)
}

module.exports = {
	name: 'gif',
	description: 'Send a specified gif.',
	execute(message, args) {
		get_gif(message, args).then(() => console.log("gif sent"));
	},
};