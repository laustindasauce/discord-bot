const fs = require('fs');
const Discord = require('discord.js')
const fetch = require('node-fetch')
const client = new Discord.Client()

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const token = process.env.TOKEN
const public = process.env.PUBLIC
const bot_id = process.env.BOT_ID
const secret = process.env.SECRET
const prefix = '!'

client.once('ready', () => {
	console.log("Bot has logged in successfully!")
});

client.on('message', message => {

    tokens = message.content.split(' ')

    if (tokens[0] === '!gif') {
        get_gif(message, tokens)
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
    }
    
});

async function get_gif(message, tokens) {
    let keywords = 'happy'
    if (tokens.length > 1) {
        keywords = tokens.slice(1, tokens.length).join(' ')
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=off`
    let response = await fetch(url)
    let json = await response.json()
    const index = Math.floor(Math.random() * json.results.length)
    message.channel.send(json.results[index].url)
    console.log("gif sent")
}


client.login(token)