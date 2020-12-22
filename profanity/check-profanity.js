var badwordsArray = require('badwords/array');
var Redis = require('ioredis')

const redisPass = process.env.REDIS_PASS
const redisHost = process.env.REDIS_HOST

var redis = new Redis({
    port: 6379,          // Redis port
    host: redisHost,   	 // Redis host
    password: redisPass, // Redis pass
    db: 9,				 // Redis database
})

module.exports = {
	name: 'check-profanity',
	description: 'Profanity filter that will delete and punish users who message blacklisted words.',
	execute(message) {
		for (var i in badwordsArray) {
            if (message.content.toLowerCase().includes(badwordsArray[i])) {
                let data = []
                message.delete();
                data.push("Profanity was found in your message:")
                data.push(message.content)
                console.log(message.author.username)
                let title = message.author.username + "-prof-count"
                // console.log(title)
                redis.incr(title)
                let count = 0;
                redis.get(title).then(function (res) {
                    count = res;
                    let body = "You have now sent " + count + " messages marked as containing profanity.";
                    data.push(body)
                    if (3 - count == 1) {
                        body = "If you send 1 more profane message you will be kicked from the server.";
                    } else if (count > 2) {
                        body = "You have been kicked from the server for sending too many messages containing profanity.";
                    } else {
                        count = 3 - count
                        body = "If you send " + count + " more profane messages you will be kicked from the server.";
                    }
                    data.push(body)
                    body = "If you believe to have received this in error and the message you sent was clean, ";
                    body += "please submit an appeal to one of the admins."
                    data.push(body)
                    
                    return message.author.send(data, { split: true })
                        .then(() => {
                            if (res > 2) {
                                /**
                                 * Uh oh this user can't control their potty mouth... 
                                 * I think for now this will just be a kick
                                 * The user can rejoin still if they have an invite and will be kicked again
                                 * each time they come back and send a profane message
                                 * 
                                 * Could adjust this to ban if need be
                                 * Also could have a second if that is 10 or so and have that ban the user
                                 */
                                message.member
                                .kick('User has sent a message with profanity at least 3 times now.')
                                .then(() => {
                                    // We let the message author know we were able to kick the person
                                    message.reply(`Successfully kicked ${message.author.tag}`);
                                })
                                .catch(err => {
                                    // An error happened
                                    // This is generally due to the bot not being able to kick the member,
                                    // either due to missing permissions or role hierarchy
                                    message.reply('I was unable to kick the member');
                                    // Log the error
                                    console.error(err);
                                });
                            }
                            if (message.channel.type === 'dm') return;
                            message.channel.send('https://tenor.com/view/watch-your-profanity-funny-gif-5600117');
                        })
                        .catch(error => {
                            console.error(`Could not send profanity warning DM to ${message.author.tag}.\n`, error);
                            message.reply('It seems like I can\'t DM you!\nhttps://tenor.com/view/watch-your-profanity-funny-gif-5600117');
                        });
                });
            }
        }
	},
};