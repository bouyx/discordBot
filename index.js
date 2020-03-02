const fs = require("fs")
const Discord = require("discord.js")

const words = fs
  .readFileSync("words.txt")
  .toString()
  .split("\n")
const client = new Discord.Client()
let numberOfPlayer = 0
const players = []
let mot = ""
const channelId = "680494155172020271"

// We should use process.env.DISCORD
client.login("NjczNDkyMzc3MTU1MTQxNjYx.XlCFCw.mTtKNjt3NmtZ85Jk9C9DQAVkrFk")

client.on("ready", () => {
  console.log("running")
})

// We could use switch case instead of 3 ifs
client.on("message", msg => {
  if (msg.content.match("Start[3-8]")) {
    initGame(msg)
  }

  if (msg.content.match("In")) {
    if (numberOfPlayer === 0) {
      msg.reply("pas de game")
    } else if (players.indexOf(msg.author) === -1) {
      addPlayer(msg)
      if (numberOfPlayer === 0) {
        startGame()
      }
    }
  }

  if (msg.content.match("End")) {
    for (let i = 0; i < players.length; i++) {
      players[i].send("reponse : " + mot)
    }
  }
})

function startGame() {
  mot = getRandomInt(words.length)
  let traitor
  let master

  // WTF!!!
  // We should use v4 from uuid package to ensure that traitor and master are
  // not same
  do {
    traitor = getRandomInt(players.length)
    master = getRandomInt(players.length)
  } while (master === traitor)

  client.channels
    .get(channelId)
    .send(
      "Le MJ est : " + players[master].username + " , ordre des questions->"
    )
  for (let i = 0; i < players.length; i++) {
    if (i === traitor) {
      players[i].send("Traitor : " + words[mot])
      client.channels.get(channelId).send(players[i].username)
    } else if (i === master) {
      players[i].send("Maitre : " + words[mot])
    } else {
      players[i].send("Citoyen")
      client.channels.get(channelId).send(players[i].username)
    }
  }

  // What is this doing? Why do we need it?
  setTimeout(timeOut, 300000, words[mot])
}

function addPlayer(msg) {
  client.channels.get(channelId).send(msg.author.username)
  players.push(msg.author)
  numberOfPlayer--
}

function initGame(msg) {
  client.channels.get(channelId).bulkDelete(100)
  client.channels.get(channelId).send("give me an Cookie")
  numberOfPlayer = parseInt(msg.content.slice(-1))
}

function timeOut(arg) {
  client.channels.get(channelId).send("TimeOut : " + arg)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
