const fs = require('fs');

module.exports = (client) => {
    
    fs.readdirSync('./Commands').filter(f => f.endsWith(".js")).forEach(dirs => {
        let commands = require(`../Commands/${dirs}`);
        if(!commands.name || typeof commands.name !== 'string') return console.log(`Commande ${dirs} n'a pas de nom ou n'est pas une chaîne de caractères.`);
        client.commands.set(commands.name, commands);
        console.log(`Commande ${commands.name} chargée !`);
    });

}