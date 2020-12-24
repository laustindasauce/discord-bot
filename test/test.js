const { MessageEmbed } = require("discord.js");

module.exports.execute = async (message, args) => {
    const { commands, functions } = message.client;

    if (args.length) {
        args = args.join(' ');
        const command = commands.get(args)
		|| commands.find(cmd => cmd.aliases && cmd.aliases.includes(args));

        if (!command) {
            const func = functions.get(args)
            || functions.find(cmd => cmd.aliases && cmd.aliases.includes(args));

            if (!func) return message.reply(`${args} is not a vaild command`);
            if (func.test()) return message.channel.send(`${func.name}: **passing**`)
            return message.channel.send(`${func.name}: **FAILED**`)
        }

        if (command.test()) return message.channel.send(`${command.name}: **passing**`)
            return message.channel.send(`${command.name}: **FAILED**`)
    }
    const testEmbed = new MessageEmbed()
        .setTitle('Testing BotGuy\'s commands')
        .setTimestamp()
	    .setFooter('To run a command send => **![command name]**', 'https://discord.bots.gg/img/logo_transparent_coloured.png');
    for (let value of commands.values()){
        if (value.test()) {
            testEmbed.addField(`${value.name}`, `✅`, true);
        } else {
            testEmbed.addField(`${value.name}`, `❌`, true);
        }
    }

    for (let func of functions.values()){
        console.log(func.name)
        if (func.test()) {
            testEmbed.addField(`${func.name}`, `✅`, true);
        } else {
            testEmbed.addField(`${func.name}`, `❌`, true);
        }
    }

    message.channel.send(testEmbed);
    //     data.push('Here\'s a list of all my commands:');
    //     data.push(commands.map(command => command.name).join(', '));
    //     data.push(functions.map(command => command.name).join(', '));
    //     data.push(`\nYou can send \`!help [command name]\` to get info on a specific command!`);
    //     for (let i = client.config.permLevels.length-1; i >= 0; i--) {
    //         const thisLevel = client.config.permLevels[i];
    //         embed.addField( `\tLevel: ${thisLevel.level}\t{${thisLevel.name}}`, `\tDescription: ${thisLevel.description}`, false)
    //     }

    //     return message.author.send(data, { split: true })
    //         .then(() => {
    //             if (message.channel.type === 'dm') return;
    //             message.reply('I\'ve sent you a DM with all my commands!');
    //         })
    //         .catch(error => {
    //             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
    //             message.reply('it seems like I can\'t DM you!');
    //         });
    // }

    // const name = args[0].toLowerCase();
    // const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    // const func = functions.get(name) || functions.find(c => c.aliases && c.aliases.includes(name));

    // if (!command) {
    //     if (!func) return message.reply('that\'s not a valid command!');

    //     data.push(`**Name:** ${func.name}`);

    //     if (func.aliases) data.push(`**Aliases:** ${func.aliases.join(', ')}`);
    //     if (func.description) data.push(`**Description:** ${func.description}`);
    //     if (func.usage) data.push(`**Usage:** !${func.name} ${func.usage}`);

    //     data.push(`**Cooldown:** ${func.cooldown || 3} second(s)`);

    // } else {
    //     data.push(`**Name:** ${command.name}`);

    //     if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    //     if (command.description) data.push(`**Description:** ${command.description}`);
    //     if (command.usage) data.push(`**Usage:** !${command.name} ${command.usage}`);

    //     data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
    // }

    // message.channel.send(data, { split: true });
};