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

        // Get latest version from database
        redis.get('version').then((res) => {if (res) version = res;})
        redis.get('mod1').then((res) => {if (res) mod1 = res;})
        redis.get('mod2').then((res) => {if (res) mod2 = res;})

        if (mod2 < 9) {
            redis.incr('mod2')
            mod2++;
        } else {
            if (mod2 < 9) {
                redis.incr('mod1')
                redis.set('mod2', "0")
                mod2 = 0;
                mod1++;
            } else {
                redis.set('mod2', "0")
                redis.set('mod1', "0")
                redis.incr('version')
                mod1 = 0;
                mod2 = 0;
                version++;
            }
        }
        let to_string = `Updated Version:\n\tVersion:\t${version}.${mod1}.${mod2}`
        return to_string;
	},
};