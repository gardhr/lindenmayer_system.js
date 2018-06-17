function demo() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  function rotate(degrees) {
    context.rotate((degrees * Math.PI) / 180);
  }
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  context.lineWidth = 2;
  context.strokeStyle = "green";
  context.translate(canvas.width / 2, canvas.height / 2);
  rotate(Math.random() * 360);
  var dragon_curve = { axiom: "DX", rules: [["X", "XRYDR"], ["Y", "LDXLY"]] };
  var generator = lindenmayer_system(dragon_curve);
  function loop() {
    var next = generator.next();
    if (next == "L") rotate(90);
    else if (next == "R") rotate(-90);
    else if (next == "D") {
      var span = 3;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, span);
      context.stroke();
      context.translate(0, span);
    }
  }
  setInterval(loop, 1);
}
