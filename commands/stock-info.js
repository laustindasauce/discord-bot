const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'stock-info',
	aliases: ['company', 'info'],
	description: 'Get info of a company searched by ticker.',
	usage: 'TSLA',
	args: true,
	readOnly: false,
	guildOnly: false,
	cooldown: 10,
	permLevel: 0,
	/**
	 * This command uses Finnhub to get the company profile of specified ticker
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute: async (message, args, _redis, _level) => {
		const stock = args[0].toUpperCase();
        let companyInfo = null;
        fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=c24i3o2ad3i89m1l92bg`
        )
        .then((res) => res.json())
        .then((res) => {
            companyInfo = res;
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
			if ( Object.keys(companyInfo).length === 0) {
				return message.reply(`**${stock}** info is not available.`)
			}
            const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setAuthor(companyInfo.name, companyInfo.logo)
			.setTitle(`${stock}`)
            .setURL(companyInfo.weburl)
            .addField("Industry", companyInfo.finnhubIndustry, true)
			.addField("IPO Date", companyInfo.ipo, true)
			.addField("Market Cap", `${companyInfo.marketCapitalization}M`, true)
			.addField("Shares Outstanding", companyInfo.shareOutstanding, true)
			// .setFooter(`[Web URL]() | `)
			.setTimestamp(Date.now());

		    message.channel.send(embed);
        });
	}
};