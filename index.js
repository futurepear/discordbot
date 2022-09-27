//import file reading moduleaaa
const fs = require('fs');
//import the database 
const db = require('./database/database');
//this will run deploy-commands.js and do an API call to discord to update slash commands 
require('./deploy-commands');
//import some discordjs bs
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
//get the discord bot token from env
const token = process.env.DISCORD;
let G = GatewayIntentBits;
//create the client
const client = new Client({ intents: [G.Guilds, G.GuildMessages, G.MessageContent, G.GuildMessageReactions, G.GuildPresences, G.GuildMembers, G.GuildBans, G.GuildIntegrations] });


client.commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require('./commands/' + file.split('.')[0]);
  client.commands[command.data.name] = command;
}

//when the client connects this will run
client.once('ready', () => {
  console.log('ready');
});
client.on('error', (e) => {
  console.log(e);
});

client.on("messageCreate", async (msg) => {
  if (msg.content.match(/zaz/gm))
    msg.delete();
});

//INTERACTIONS WITH SLASH COMMANDS + BUTTONS
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;
  //console.log(interaction.customId);
  const command = interaction.client.commands[interaction.commandName];
  if (!command) return;

  try {
    await command.execute(interaction, db);
  } catch (e) {
    console.log(e);
    let str = e.toString().substring(6);
    //if (e.cause !== "user") return;
    let failembed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setDescription(':x:' + str);
    await interaction.reply({ embeds: [failembed] });
  }
});

client.login(token);
