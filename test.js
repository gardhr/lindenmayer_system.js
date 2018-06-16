var log = console.log;
try {
  var lindenmayer_system = require("./lindenmayer_system");
  var args = { axiom: "0", rules: [["1", "11"], ["0", "1[0]0"]] };
  var generator = lindenmayer_system(args);
  for (var i = 0; i < 40; ++i) {
    process.stdout.write(generator.next());
  }
  log("");
} catch (error) {
  log("Error:", error);
}
