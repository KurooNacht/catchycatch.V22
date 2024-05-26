const chalk = require("chalk");
const spam = require("../functions/spam.js");
const config = require("../config.json");
const { sendLog, sendWebhook } = require("../functions/logging.js");

module.exports = async (client) => {
  sendLog(
    null,
    `Logged in to ${chalk.red.bold(`${client.user.username}`)}!`,
    "INFO"
  );
  sendWebhook(null, {
    title: `Logged in to ${client.user.username}!`,
    color: "#60fca4",
    url: "https://github.com/KurooNacht/catchycatch.git",
    footer: {
      text: "Catchycatch",
      icon_url:
        "https://cdn.discordapp.com/avatars/1244319060209045556/3602ea0fabc549c0431a9a43a70bc13f.webp?size=64",
    },
  });
  client.user.setStatus("invisible");
  if (config.incense.AutoIncenseBuy == true) {
    client.channels.cache
      .get(config.incense.IncenseChannel)
      .send(`<@716390085896962058> buy incense`);
  }
};
