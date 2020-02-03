const Discord = require('discord.js');
const randomWordFR = require('random-word-fr');
const client = new Discord.Client();

const token = '';
var numberOfPlayer = 0;
var registration = false;
var players = [];


bot.on("message", function (msg) {
	if (msg.content.match("Start[0-6]")) {
        numberOfPlayer = parseInt(msg.content.slice(-1));
        registration = true;
    }
    if (msg.content.match("In")) {
        if (numberOfPlayer === 0){
            msg.reply("pas de game")
        }else{
           players.add(msg.author);
           numberOfPlayer--;
           if(numberOfPlayer===0){
                var mot = randomWordFR();
                var traitor;
                var master;
                do {
                    traitor = getRandomInt(players.length);
                    master = getRandomInt(players.length);
                } while (master===traitor);
                for(var i = 0; i < players.length;i++){
                    if(i === traitor){
                        players[i].send("traite :"+mot);
                    }else if(i === master){
                        players[i].send("MJ :"+mot);
                    }else{
                        players[i].send("citoyen");
                    }
                }
              
            }
        }  
	}
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
