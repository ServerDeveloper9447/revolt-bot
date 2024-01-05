const revolt = require("revolt.js");
const client = new revolt.Client();
const Uploader = require("revolt-uploader");
const uploader = new Uploader(client);
client.uploader = uploader
client.on("ready", () => {
  console.log("Ready!")
});
require('./revolt-handler')(client,{path_to_dir:"./commands",prefix:"!"})
client.loginBot(process.env.token);