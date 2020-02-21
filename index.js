const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');
var words = fs.readFileSync('words.txt').toString().split("\n");


var numberOfPlayer = 0;
var players = [];

var channelId = '680494155172020271';
client.login("NjczNDkyMzc3MTU1MTQxNjYx.XjcgFw.dPT_oi9J7PqtfBt11TIz9Z0jcfA");

client.on("ready", ()=>{
  console.log('suce');
})

client.on("message", function (msg) {
  console.log(players)
  if (msg.content.match("Start[3-8]")) {
    initGame(msg);
  }
  if (msg.content.match("In")) {
    if (numberOfPlayer === 0) {
      msg.reply("pas de game")
    } else if(players.indexOf(msg.author.username)===-1) {
      addPlayer(msg);
      console.log(numberOfPlayer);      
      if (numberOfPlayer === 0) {
        startGame();
      }
    }
  }
});

function startGame(){
  mot = getRandomInt(words.length);
  var traitor;
  var master;
  do {
    traitor = getRandomInt(players.length);
    master = getRandomInt(players.length);
  } while (master === traitor);
  client.channels.get(channelId).send("Le MJ est : "+players[master].username+" , ordre des questions->")
  for (var i = 0; i < players.length; i++) {
    if (i === traitor) {
      players[i].send("Traitor : " + words[mot]);
      client.channels.get(channelId).send(players[i].username)
    } else if (i === master) {
      players[i].send("Maitre : " + words[mot]);
    } else {
      players[i].send("Citoyen");
      client.channels.get(channelId).send(players[i].username)
    }
  }
  setTimeout(timeOut, 10000, words[mot]);
}

function addPlayer(msg){
  client.channels.get(channelId).send(msg.author.username)
  players.push(msg.author);
  numberOfPlayer--;
}

function initGame(msg){
  client.channels.get(channelId).bulkDelete(100);
  client.channels.get(channelId).send("give me an In");
  numberOfPlayer = parseInt(msg.content.slice(-1));
}

function timeOut(arg){
  client.channels.get(channelId).send("TimeOut : "+arg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}