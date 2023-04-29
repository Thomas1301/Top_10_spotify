const discord = require('discord.js');
const intents = new discord.IntentsBitField(3276799);
const client = new discord.Client({intents});
const loadCommands = require('./Loader/loadCommands');
const { token } = require("./config.json");

client.commands = new discord.Collection();

client.login(token);
loadCommands(client);

client.on("messageCreate", (message) => {
    if (message.content === "/ping") {
        message.channel.send("pong");
    }
});

client.on("ready", () => {
  console.log(`${client.user.tag} est connecté !`);
});