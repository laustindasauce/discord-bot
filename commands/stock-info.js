const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'stock-info',
	aliases: ['company', 'info', 'stock'],
	description: 'Get info of a company searched by ticker.',
	usage: 'TSLA',
	args: true,
	readOnly: false,
	channels: ['stock-market'],
	guildOnly: false,
	cooldown: 20,
	permLevel: 0,
	/**
	 * This command uses Finnhub to get the company profile of specified ticker
	 * 
	 * Example Quote response
	 * 
	 	{
			"c": 261.74, // Close
			"h": 263.31, // High
			"l": 260.68, // Low
			"o": 261.07, // Open
			"pc": 259.45, // Previous Close
			"t": 1582641000 // Not sure what this is (Might be the time)
		}
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	execute: async (message, args, _redis, _level) => {
		const stock = args[0].toUpperCase();
        let companyInfo = null;
		let companyQuote = null;
		const token = process.env.FINNHUB_TOKEN
        fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${token}`
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
			fetch(
				`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${token}`
			)
			.then((quote) => quote.json())
			.then((quote) => {
				companyQuote = quote;
			})
			.finally(() => {
				const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setAuthor(companyInfo.name, companyInfo.logo)
				.setTitle(`${stock}`)
				.setURL(companyInfo.weburl)
				.addFields(
					{ name: 'Open', value: companyQuote.o, inline: true },
					{ name: 'Current', value: companyQuote.c, inline: true },
					{ name: 'High', value: companyQuote.h, inline: true },
					{ name: 'Low', value: companyQuote.l, inline: true },
					{ name: 'Previous Close', value: companyQuote.pc, inline: true },
					{ name: '\u200B', value: '\u200B' }, // this is a spacer for the embed
				)
				.addField("Industry", companyInfo.finnhubIndustry, true)
				.addField("IPO Date", companyInfo.ipo, true)
				.addField("Market Cap", `${companyInfo.marketCapitalization}M`, true)
				.addField("Shares Outstanding", companyInfo.shareOutstanding, true)
				.addField('\u200B', '\u200B')
				.setTimestamp(Date.now());

				// message.channel.send(embed);
				return message.author.send(embed)
				.then(() => {
					if (message.channel.type !== 'dm') message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
			})
        });
	}
};