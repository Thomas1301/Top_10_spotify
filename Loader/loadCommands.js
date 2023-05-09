const fs = require('fs');

module.exports = (client) => {
    
    fs.readdirSync('./Commands').filter(f => f.endsWith(".js")).forEach(dirs => {
        let command = require(`../Commands/${dirs}`);
        if(!command.name || typeof command.name !== 'string') return console.log(`Commande ${dirs} n'a pas de nom ou n'est pas une chaîne de caractères.`);
        client.commands.set(command.name, command);
        console.log(`Commande ${command.name} chargée !`);
    });

}