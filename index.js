const { client_token, database } = require('./config.json')
const { Collection } = require('discord.js')
const Client = require('./structures/client')
const client = new Client()
const fs = require('fs')
const { connect } = require('mongoose')
connect(database)
client.on('ready', () => {
console.log(client.user.tag)
})
client.on("interactionCreate",i=>{
    require("./events/interactionCreate")(client,i);
})
client.slashCommands = new Collection();
module.exports = client;
fs.readdirSync('./handlers').forEach((handler) => {
 require(`./handlers/${handler}`)(client);
})

client.login(client_token)