try {
  var lindenmayer_system = require("./lindenmayer_system");
  var hilbert_curve = {
    axiom: "A",
    rules: [
      { before: "A", after: "-BF+AFA+FB-" },
      { before: "B", after: "+AF-BFB-FA+" }
    ]
  };
  var generator = lindenmayer_system(hilbert_curve);
  var delay = 50;
  setInterval(function() {
    process.stdout.write(generator.next());
  }, delay);
} catch (error) {
  console.log("Error:", error);
}
