try {
  var lindenmayer_system = require("./lindenmayer_system");
  var A = 0;
  var B = 1;
  var draw = 2;
  var left = 3;
  var right = 4;
  var hilbert_curve = {
    axiom: A,
    rules: [
      {
        before: A,
        after: [left, B, draw, right, A, draw, A, right, draw, B, left]
      },
      {
        before: B,
        after: [right, A, draw, left, B, draw, B, left, draw, A, right]
      }
    ]
  };
  var generator = lindenmayer_system(hilbert_curve);
  var delay = 50;
  setInterval(function() {
    var next = generator.next();
    var text = null;
    if (next == A) text = "A";
    else if (next == B) text = "B";
    else if (next == draw) text = "draw";
    else if (next == left) text = "left";
    else if (next == right) text = "right";
    process.stdout.write(text + ", ");
  }, delay);
} catch (error) {
  console.log("Error:", error);
}
