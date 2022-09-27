const { EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: {
    name: 'aaaa',
    description: 'test',
  },
  execute: (async (interaction, db) =>  {
    //basic embed that shows the options avaliable
    let embed  = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('test')
      .setDescription('hi')
      .addFields(
        {name: "regular field title", value: "text"},
        {name: 'inline field title', value: 'text', inline: true}
      )
      .setTimestamp()
      .setFooter({text: "footer"});
    let row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("test")
          .setLabel('a')
          .setStyle(ButtonStyle.Primary),
      );
    await interaction.reply({embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/