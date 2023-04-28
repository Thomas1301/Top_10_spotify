const discord = require('discord.js');
const client = new discord.Client({intents: 3276799});
const { token } = require("./config.json");

client.login(token);
client.on("ready", () => {
  console.log(`${client.user.tag} est connecté !`);
});