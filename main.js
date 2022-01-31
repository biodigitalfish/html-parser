const main = require("./checkTags.js");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter paragraph to check: ", function (paragraph) {
  main.checkTags(paragraph);
  rl.close();
});

rl.on("close", function () {
  process.exit(0);
});
