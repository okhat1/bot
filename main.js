let playerCount = 0;
let players = new Object();

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
    if (command === 'q' && !players.hasOwnProperty(message.author.id) && Object.keys(players).length < 10) {
      players[message.author.id] = message.author.username;
      playerCount++;
      let count = "There are " + playerCount + " players in queue";
      message.channel.send(count);
      setTimeout(() => {
        delete players[message.author.id];
        playerCount--;
        message.channel.send(`<@${message.author.id}> has been removed from queue`);
        let count = "There are " + playerCount + " players in queue";
        message.channel.send(count);
      }, 1000 * 60 * 60 * 2)
    } else if (command === 'l' && players.hasOwnProperty(message.author.id)) {
      delete players[message.author.id];
      playerCount--;
      let count = "There are " + playerCount + " players in queue";
      message.channel.send(count);
    }
  }

  if (Object.keys(players).length == 10) {
      let sortable = [];
      for (var member in players) {
        sortable.push([member]);
      }
      shuffleArray(sortable);
      for(let i = 0; i < sortable.length; i++){
        if(i < sortable.length/2){
          message.channel.send(`Team 1: <@${sortable[i]}>`);
        }else{
          message.channel.send(`Team 2: <@${sortable[i]}>`);
        }
      }
    for (var member in players) delete players[member];
    playerCount = 0;
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

client.login('MTA1Nzc3NTE0ODE4MDE4OTI4NQ.G-RTPE.iisxWvvfDReNsI5PCPkPrDfCJqxCVb8-nl-OE4');
