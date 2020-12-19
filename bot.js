console.log("Beep Boop")

token = process.env.TOKEN
public = process.env.PUBLIC
bot_id = process.env.BOT_ID
secret = process.env.SECRET
tenor_key = process.env.TENORKEY

const Discord = require('discord.js')
const fetch = require('node-fetch')
const client = new Discord.Client()

client.login(token)

client.on('ready', readyDiscord)

client.on('message', gotMessage)

function readyDiscord() {
    console.log("Bot has logged in successfully!")
}

const replies = [
    'Hey there',
    "Hi i'm a bot",
    "What's going on here?",
    "YES"
]

async function gotMessage(msg) {
    if (msg.channel.id == '789694387431931944'){

        tokens = msg.content.split(' ')

        if (tokens[0] === '!bot') {
            const index = Math.floor(Math.random() * replies.length)
            msg.channel.send(replies[index])
        } else if (tokens[0] === '!gif') {
            let keywords = 'happy'
            if (tokens.length > 1) {
                keywords = tokens.slice(1, tokens.length).join(' ')
            }
            let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${tenor_key}&ContentFilter=off`
            let response = await fetch(url)
            let json = await response.json()
            const index = Math.floor(Math.random() * json.results.length)
            msg.channel.send(json.results[index].url)
        }
    }
}
