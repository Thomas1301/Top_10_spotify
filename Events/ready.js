const discord = require('discord.js');

module.exports = async client => {
    console.log(`Connecté en tant que ${client.user.tag} !`);
    client.user.setActivity("être un bot", { type: "PLAYING" });
}