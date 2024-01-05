module.exports = {
  name: "eval",
  run: async (client,message,args) => {
    let _evaled;
        try {
            _evaled = await eval(args.join(' ')); // try to eval
        } catch (err) {
            _evaled = err; // show error if fail
        }
    const evaled = (typeof _evaled === 'object' ? require('util').inspect(_evaled, {depth: 0}) : _evaled) + '';
    message.reply({embeds:[{
description: `\`\`\`js
${evaled.slice(0,2e3)}
\`\`\``,
        title: `Output type: ${typeof (evaled.slice(0,2e3))} | ${evaled.slice(0,2e3).split("\n").length} line(s)`,
      color: parseInt("32343d",16)
    }]}).catch(err => {
      require('fs').writeFileSync('err.txt',err.toString())
    })
  }
}