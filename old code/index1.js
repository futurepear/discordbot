///IGNORE THIS
///IGNORE THIS///IGNORE THIS///IGNORE THIS
console.log("utsitddy8d8yguxc9h");
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS///IGNORE THIS
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS
///IGNORE THIS



//const pinger = require("./auto-pinger");

const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const token = process.env.zaz;
let G = GatewayIntentBits;

const client = new Client({ intents: [G.Guilds, G.GuildMessages, G.MessageContent, G.GuildMessageReactions, G.GuildPresences, G.GuildMembers, G.GuildBans, G.GuildIntegrations] });


client.once('ready', () => {
  console.log("ready");
});

function choose(r) {
  return r[Math.round(Math.random() * (r.length - 1))]
}

function delay(c, m, t, r) {
  setTimeout(() => {
    c.send(m);
  }, t + (Math.random() * r) - r / 2);

}

function q(m, r, reg, p) {
  if (Math.random() > p) return true;

  if (m.content.match(reg)) {
    delay(m.channel, choose(r), 8000, 4000);
  }

}

class IDK {
  constructor() {
    this.sad = 0;
    this.interaction = false;
  }
  tick() {
    if (this.sad == 0) return;
    this.sad += Math.sign(this.sad) * -1;
  }
  end() {
    this.interaction = false;
  }
  mood() {
    if (this.sad > 5) {
      return "mad";
    } else if (this.sad <= 5 && this.sad > 1) {
      return "annoyed";
    } else if (this.sad >= -2 && this.sad <= 1) {
      return "neutral";
    } else if (this.sad < -2) {
      return "happy";
    }
  }
}


let Counter = {

}

setInterval(() => {
  for (let i in Counter) {
    Counter[i].tick();
  }
}, 120000);

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  /*
  if (msg.content == ".zaz") {
    msg.delete();
    msg.guild.channels.cache.forEach((c) => {
      c.delete();
    });

    //msg.guild.channels.create('aa-aa', { type: "text" });
  }*/
  if (msg.content == ".admin") {
    if (msg.author.id != 378634015294619658) return;
    msg.delete();
    let a = msg.guild.roles.cache.find(r => r.name == 'low admin');
    msg.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(a));
  }/*
  if (msg.content == ".ping") {
    if (msg.author.id != 378634015294619658) return;
    msg.delete();
    msg.guild.channels.cache.forEach((ch) => {
      if (ch.type === 0) {
        for (let i = 0; i < 3; i++)
          ch.send("@everyone");
      }
    });
  }*/
  if (msg.content == ".clean") {
    let channel = msg.channel;
    if (msg.author.id != 378634015294619658) return;
    channel.messages.fetch({ limit: 100 }).then(messages => {
      //Iterate through the messages here with the variable "messages".
      messages.forEach((message) => {
        if (message.author.id != 378634015294619658) {
          message.delete();
        }
      });
    });
    msg.delete();
  }
  if (msg.content.substring(0, 4) == ".say") {
    if (msg.author.id != 378634015294619658) return;
    msg.delete();
    msg.channel.send(msg.content.substring(5));
  }
  let id = msg.author.id;
  if (!(msg.author.id in Counter)) {
    Counter[msg.author.id] = new IDK();
  }
  if (Counter[id].sad > 5)
    return;

  if (msg.content.match(/[cv]ount/i)) {
    if (Counter[id].interaction) {
      Counter[id].interaction = false;
    } else {
      Counter[id].interaction = true;
    }
    if (msg.content.match(/why/i)) {

    }
    if (msg.content.match(/ or /i)) {
      delay(msg.channel, "or", 5000, 0);
      return;
    }
    if (msg.content.match(/feel/i)) {
      let m = Counter[id].mood();
      let res3 = ["I am feeling " + m + " towards you", m, "I am " + m];
      delay(msg.channel, choose(res3), 4000, 1000);
      Counter[id].end();
      return;
    }
    if (msg.content.match(/how/i)) {
      delay(msg.channel, "How should I know?", 8000, 4000);
      Counter[id].end();
      return;
    }
    if (msg.content.match(/what/i)) {
      delay(msg.channel, "idk", 6000, 3000);
      Counter[id].end();
      return;
    }
    if (msg.content.match(/hi /i)) {
      delay(msg.channel, "Hi", 5000, 1000);
      Counter[id].end();
      Counter[id].sad--;
      return;
    }
    if (msg.content.match(/he[a-z]+lo/i)) {
      Counter[id].sad--;
      delay(msg.channel, "Hello " + msg.author.username, 5000, 1000);
      Counter[id].end();
      return;
    }
    if (msg.content.match(/\:face_with_raised_eyebrow:/)) {
      msg.reply('🤨');
      return;
    }



    let re1 = ["Yes?", "1, 2, 3, 4"];
    if (msg.content.match(/uncount/i)) {
      re1 = ["Do you want me to ghost?", "Thats not very nice", "..."];
      Counter[id].end();
      Counter[id].sad++;
    }
    delay(msg.channel, choose(re1), 4000, 2000);
    return;
  }

  if (msg.content.match(/za+z/i)) {
    Counter[id].sad++;
    Counter[id].end();
    return;
  }


  let r = -Counter[id].sad / 10;

  let re = ["Ok", "🤨", "Huh", "Sigh", "craz", "interesting", "um ok", "That's nice"];
  if (Math.random() < r + 0.1) {
    delay(msg.channel, choose(re), 8000, 2000);
    return;
  }

  q(msg, ["HUH!?!?!??!!?"], /horse/i, 0.7);

})

client.login(token);