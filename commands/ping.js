module.exports = {
  name: "ping",
  run: async (client,message,args) => {
      const start = Date.now()
    message.channel.sendMessage({embeds:[{description:"Pinging..."}]})
    .then(msg => {
      setTimeout(() => {
        msg.edit({embeds:[{
          title: "Pong!",
          description:`\`\`\`yaml
Database                : ${Date.now() - start - 3e3}ms
Custom Library Version  : v3.2.6
\`\`\`
`
        }]})
      },3e3)
    })
  }
}