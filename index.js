const Discord = require('discord.js');
const randomWordFR = require('random-word-fr');
const client = new Discord.Client();

client.login("NjczNDkyMzc3MTU1MTQxNjYx.XjcgFw.dPT_oi9J7PqtfBt11TIz9Z0jcfA");

const token = '';
var numberOfPlayer = 0;
var registration = false;
var players = [];
var mot = '';

client.on("message", function (msg) {
	if (msg.content.match("Start[3-8]")) {
        players=[]
        numberOfPlayer = parseInt(msg.content.slice(-1));
        registration = true;
    }
    if (msg.content.match("In")) {
        if (numberOfPlayer === 0){
            msg.reply("pas de game")
        }else{
           players.push(msg.author);
           numberOfPlayer--;
           msg.reply("game joined")
           if(numberOfPlayer===0){
                mot = randomWordFR();
                var traitor;
                var master;
                do {
                    traitor = getRandomInt(players.length);
                    master = getRandomInt(players.length);
                } while (master===traitor);
                for(var i = 0; i < players.length;i++){
                    if(i === traitor){
                        players[i].send("traitre : "+mot);
                        players[i].send("le MJ est : pas fini");
                    }else if(i === master){
                        players[i].send("MJ :"+mot);
                    }else{
                        players[i].send("citoyen");
                        players[i].send("traitre : pas fini");
                    }
                }          
            }
        }  
    }
    if (msg.content.match("End")) {
        for(var i = 0; i < players.length;i++){
            players[i].send("reponse : "+mot);
        }

    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
