const { EmbedBuilder } = require('discord.js');
const check = require('../util/command-errors');

module.exports = {
  data: {
    name: 'farm',
    description: 'shows information on your farm',
  },
  execute: (async (interaction, db) =>  {
    let id = interaction.user.id;
    let user = await db.getUser(id);

    check(user);
    //embed
    let embed  = new EmbedBuilder()
      .setColor(0xFF8800)
      .setTitle('Farm')
      .addFields(
        {name: "💵 Money", value: '$'+user.money},
        {name: ":park: Acres", value: Object.keys(user.acres).length+''},
      )
      .setFooter({text: "e..."});
    
    await interaction.reply({embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/