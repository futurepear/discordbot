const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const createUser = require('../database/userschema');


module.exports = {
  data: {
    name: 'found',
    description: 'Found your first pyrus farm',
  },
  execute: (async (interaction, db) =>  {
    let id = interaction.user.id;
    let user = await db.collection('discord', 'users').findOne({id: id});
    //embed
    let embed  = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('Success')
      .setDescription(':pear: Your farm has been created! :pear:')
      .setFooter({text: "type /tutorial to get started"});
    
    if(user == null){
      //create a user
      let user = await db.collection('discord', 'users').insertOne(createUser(id));
    } else {
      throw new Error('you already founded a farm', {cause: "user"});
    }
    
    await interaction.reply({embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/