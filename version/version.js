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
	name: 'version',
	description: 'Update application version with each GitHub push.',
	execute(client) {
        let version = 1;
        let mod1 = 0;
        let mod2 = 0;
        redis.get('version').then((res) => {
            if (res) {
                version = res;
            }
        })
        redis.get('mod1').then((res) => {
            if (res) {
                mod1 = res;
            }
        })
        redis.get('mod2').then((res) => {
            if (res) {
                mod2 = res;
            }
        })

        if (mod2 < 9) {
            mod2++;
            redis.set('mod2', mod2)
        } else {
            if (mod2 < 9) {
                mod2 = 0;
                mod1++;
                redis.set('mod2', mod2)
                redis.set('mod1', mod1)
            } else {
                mod1 = 0;
                mod2 = 0;
                version++;
                redis.set('mod2', mod2)
                redis.set('mod1', mod1)
                redis.set('version', version)
            }
        }
        let to_string = `Updated Version:\n\tVersion:\t${version}.${mod1}.${mod2}`
        client.channels.get('790960191792873573').send(to_string);
	},
};