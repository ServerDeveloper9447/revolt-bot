const fetch = require('node-fetch')
const https = require('https')
module.exports = {
  name: 'imagine',
  description: "Generate AI art from prompt",
  run: async (client,message,args) => {
    if(!args[0]) return message.channel.sendMessage("What to imagine?");
      try {
        fetch(process.env.model,{
          method: 'post',
          body: JSON.stringify({inputs:{prompt:args.join(" ")}}),
          headers: {'Content-Type':'application/json'}
        })
        .then(f => f.json())
        .then(f => {
          message.reply("Generating...",false)
          .then(msg => {
            if(!f.uuid) throw new Error("No uuid");
            const start = Date.now()
            let info = 0;
          function tryfetch() {
            fetch(`${process.env.model}/${f.uuid}`)
          .then(e => e.json())
          .then(async data => {
            if(data.prediction.status != "succeeded") {
              setTimeout(() => {
                msg.edit({content:" ",embeds:[{
                title: "Generation progress",
                description: !data.prediction.run_logs ? "Loading..." : data.prediction.run_logs?.split("\n").slice(-1)[0]
              }]})
                if(((Date.now() - start) > 15000) && info == 0) {
                  message.channel.sendMessage("Hmmm... This is taking longer");
                  info = 1;
                }
                tryfetch();
              },2000);
            } else {
              https.get(data.prediction.output_files[0], async (img) => {
                msg.edit({embeds:[{
               title: "Generated",
               description: `Prompt: ${args.join(" ")}
[Click here to download](${data.prediction.output_files[0]})`,
                  media: await client.uploader.upload(img, "image.png")
             }]}).catch(err => {
               require('fs').writeFileSync('data.txt',String(err))
             })
              })
            }
          }).catch(err => {
            console.log(err)
            require('fs').writeFileSync("err.txt",err.toString())
  message.channel.sendMessage("Generation failed. This can happen for various reasons like nsfw inputs.")
          })
          }
          tryfetch()
          }).catch(err => {
          console.log(err)
            require('fs').writeFileSync("err.txt",err.toString())
  message.channel.sendMessage("Generation failed. This can happen for various reasons like nsfw inputs.")
        })
        }).catch(err => {
          console.log(err)
          require('fs').writeFileSync("err.txt",err.toString())
  message.channel.sendMessage("Generation failed. This can happen for various reasons like nsfw inputs.")
        })
      } catch(err) {
  console.log(err)
        require('fs').writeFileSync("err.txt",err.toString())
  message.channel.sendMessage("Generation failed. This can happen for various reasons like nsfw inputs.")
      }
  }
}