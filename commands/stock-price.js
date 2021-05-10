var axios = require('axios');

module.exports = {
	name: 'stock-price',
	aliases: ['stock', 'price'],
	description: 'Get current price of stock ticker.',
	usage: 'TSLA',
	args: true,
	readOnly: false,
	guildOnly: false,
	cooldown: 10,
	permLevel: 0,
	/**
	 * This command is able to give some basic user-information of the member tagged 
	 * or the member who sent the message if no one is tagged
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} level users permission level
	 */
	execute: async (message, args, _redis, level) => {
		const stock = args[0].toUpperCase();
        postData = new Object();
        postData.Stock = stock;
        jsonData = JSON.stringify(postData);
        axios({
        url: `https://guldentech.com/austinapi/current-stock-price`,
        method: "post",
        data: jsonData,
        })
        .then(function (response) {
            console.log(response.data);
            if (response.data == 500) {
                message.reply("There was an internal auth error.")
            } else if (response.data == 404) {
                message.reply(`Unable to get live price of ${postData.Stock}`);
            } else {
                let currPrice = num.format(response.data, 2);
                message.reply(`${postData.stock}: ${currPrice}`)
            }
        })
        .catch(function (error) {
            message.reply('There was a server error!')
            // console.log(error);
        });
	}
};