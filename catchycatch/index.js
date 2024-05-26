const { Catcher } = require("./classes/clients/catcher.js");
const { ShinyHunter } = require("./classes/clients/shinyHunter.js");

const { createCatchers } = require("./functions/createCatchers.js");

const config = require("./config.json");
const { sendLog, sendWebhook } = require("./functions/logging.js");
const { logMemoryUsage } = require("./utils/utils.js");
const chalk = require("chalk");

async function main() {
  const displayImage = require("display-image");

  await displayImage.fromFile("./data/logo.png").then((image) => {
    console.log(image);
    console.log(
      chalk.bold.yellow(`[${"WELCOME".toUpperCase()}]`) +
        ` - ` +
        chalk.yellow.bold("Welcome to Catchycatch!")
    );
  });
    sendWebhook(null, {
      title: "Welcome to Catchycatch!",
      description: `donasi poke ato pc jan lupa cape buatnya.`,
      color: "#fecd06",
      url: "https://github.com/KurooNacht/catchycatch.git",
      footer: {
        text: "Catchycatch by shiroo",
        icon_url:
          "https://cdn.discordapp.com/avatars/1244319060209045556/3602ea0fabc549c0431a9a43a70bc13f.webp?size=64",
      },
    });

  setTimeout(() => {
    createCatchers();
    logMemoryUsage();
  }, 500);
}

process.on("unhandledRejection", (reason, p) => {
  const ignoreErrors = [
    "MESSAGE_ID_NOT_FOUND",
    "INTERACTION_TIMEOUT",
    "BUTTON_NOT_FOUND",
  ];
  if (ignoreErrors.includes(reason.code || reason.message)) return;
  sendLog(
    undefined,
    `Unhandled Rejection`,
    "error"
  );
  console.log(reason, p);
});

process.on("uncaughtException", (e, o) => {
  sendLog(undefined, `Uncaught Exception/Catch`, "error")
  console.log(e);
});

/* process.on("uncaughtExceptionMonitor", (err, origin) => {
  sendLog(undefined, `Uncaught Exception/Catch (MONITOR)`, "error")
  console.log(err, origin);
}); */

process.on("multipleResolves", (type, promise, reason) => {
  sendLog(undefined, `Multiple Resolves`, "error")
  console.log(type, promise, reason);
});


main();
