let playerCount = 0;

const Discord = require('discord.js');

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

const prefix = '-';

client.once('ready', () => {
  console.log('its botting time');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (message.channelId == "1057545714986655845") {
    if (command === 'q') {
      playerCount++;
      let count = "There are " + playerCount + " players in queue";
      message.channel.send(count);
    } else if (command === 'l') {
      playerCount--;
      let count = "There are " + playerCount + " players in queue";
      message.channel.send(count);
    }
  }
});

client.login('MTA1Nzc3NTE0ODE4MDE4OTI4NQ.G-RTPE.iisxWvvfDReNsI5PCPkPrDfCJqxCVb8-nl-OE4');
