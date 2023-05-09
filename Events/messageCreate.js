const discord = require('discord.js');
const { fstat } = require('fs');

module.exports = async (client, message) => {
    
    let prefix = "!";
    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    let command = require(`../Commands/${commandName}`);
    if(!command) return message.reply("Cette commande n'existe pas !");

    command.run(client, message, args);
 
}