module.exports = {
  name: 'test',
  run: (client,message,args) => {
    require('https').get("https://cdn.spapi.online/avatar.png", async (data) => {
message.channel.sendMessage({
      content: "Downloaded file: ",
      attachments: [await client.uploader.upload(data, "avatar.png")]
    });
})
  }
}