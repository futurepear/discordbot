const { EmbedBuilder } = require('discord.js');
const check = require('../util/command-errors');
const { parseMS } = require('../util/util');

module.exports = {
  data: {
    name: 'work',
    description: 'work every 10 minutes for some money',
  },
  execute: (async (interaction, db) => {
    //basic embed that shows the options avaliable
    let user = await db.getUser(interaction.user.id);
    check(user);
    let elapsedTime = Date.now() - user.workInterval;
    //if less than 10 minutes do error
    if (elapsedTime < 1000 * 60 * 10){
      let time = parseMS(600000 - elapsedTime);
      let str = time[0] + ' ' + time[1];
      throw new Error(`You need to wait ${time.stringify()}`, { cause: "user" });
    }
    let amount = Math.round(Math.random() * 20 - 10 + 100);
    let embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setDescription(`✅ You worked for $${amount}`);
    db.collection('discord', 'users').updateOne({ id: interaction.user.id }, { $set: { money: user.money + amount, workInterval: Date.now() } });
    interaction.reply({ embeds: [embed]});
  }),
};

/*
interaction.user
  id
  username
  discriminator
*/