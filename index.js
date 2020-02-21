const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');
var words = fs.readFileSync('words.txt').toString().split("\n");

var numberOfPlayer = 0;
var players = [];

client.login("NjczNDkyMzc3MTU1MTQxNjYx.XjcgFw.dPT_oi9J7PqtfBt11TIz9Z0jcfA");

client.on("ready", ()=>{
  console.log('suce');
})
client.on("message", function (msg) {
  if (msg.content.match("Start[3-8]")) {
    numberOfPlayer = parseInt(msg.content.slice(-1));
    players = [];
  }
  if (msg.content.match("In")) {
    if (numberOfPlayer === 0) {
      msg.reply("pas de game")
    } else {
      players.push(msg.author);
      numberOfPlayer--;      
      if (numberOfPlayer === 0) {
        mot = getRandomInt(words.length);
        var traitor;
        var master;
        do {
          traitor = getRandomInt(players.length);
          master = getRandomInt(players.length);
        } while (master === traitor);
        client.channels.get('680494155172020271').send("Le MJ sera : ",players[master].username," , ordre ->")
        for (var i = 0; i < players.length; i++) {
          if (i === traitor) {
            players[i].send("Traitor : " + words[mot]);
            client.channels.get('680494155172020271').send(players[i].username)
          } else if (i === master) {
            players[i].send("Maitre : " + words[mot]);
          } else {
            players[i].send("Citoyen -> victime");
            client.channels.get('680494155172020271').send(players[i].username)
          }

        }
        setTimeout(response, 1500, words[mot]);
      }
    }
  }
});

function response(arg){
  client.channels.get('680494155172020271').send(arg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}