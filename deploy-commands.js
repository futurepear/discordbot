//import the bs from discord.js library 
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const token = process.env.DISCORD;
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '1021841707219816609';
//const guildId = '644714081223311360';

for (const file of commandFiles) {
  let f = file.split('.')[0];
  const command = require(`./commands/${f}`);
  commands.push(command.data);
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId),{body: commands})
  .then(() => {console.log("success")})
  .catch((e) => {console.log(e)});