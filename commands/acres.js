const { EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const check = require('../util/command-errors');

module.exports = {
  data: {
    name: 'acres',
    description: 'view your acres',
  },
  execute: (async (interaction, db) =>  {
    //basic embed that shows the options avaliable
    let user = await db.getUser(interaction.user.id);
    check(user);

    let fields = [];
    for(let i in user.acres){
      fields.push({name: i, value: "Space: " + user.acres[i].filled + "/49"});
    }
    
    let embed  = new EmbedBuilder()
      .setColor(0xFF9900)
      .setTitle('Acres')
      .addFields(...fields)
      .setFooter({text: "type /shop for information to buy acres"});
    await interaction.reply({embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/