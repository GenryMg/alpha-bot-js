const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "decode64",
    description: "Decodes text from Base64.",
    usage: "<text>",
    category: "miscellaneous",
    accessibleby: m.basic,
    aliases: ["dec64", "d64"]
  },
  run: async (bot, message, args) => {
    if (!args[0]) {
      return message.channel.send("Please provide a message to encode!");
    }

    var toprocess = args.join(" ");

    let msg = await message.channel.send("Please Wait...");

    fetch(`https://some-random-api.ml/base64?decode=${toprocess}`)
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply("Something went wrong, try again!");

        let embed = new RichEmbed()
          .setColor(cyan)
          .setAuthor(`Base64 Conversion`, message.guild.iconURL)
          .addField("Message", body.text)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        msg.edit(embed);
      });
  }
};
