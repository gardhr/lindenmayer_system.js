try {
  var lindenmayer_system = require("./lindenmayer_system");
  var algae = { axiom: "A", rules: [["A", "AB"], ["B", "A"]] };
  var generator = lindenmayer_system(algae);
  var delay = 50;
  setInterval(function() {
    process.stdout.write(generator.next());
  }, delay);
} catch (error) {
  console.log("Error:", error);
}
