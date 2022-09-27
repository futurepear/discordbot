const { EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: {
    name: 'shop',
    description: 'view the shop',
  },
  execute: (async (interaction, db) =>  {
    //basic embed that shows the options avaliable
    let embed  = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('Shop')
      .addFields(
        {name: "Acre", value: "$1,000,000"},
        {name: 'inline field title', value: 'text', inline: true}
      )
      .setTimestamp()
      .setFooter({text: "footer"});
    await interaction.reply({embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/