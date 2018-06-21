"use strict";
function lindenmayer_system(args) {
  function expand(values) {
    if (typeof values == "string") {
      values = values.split("");
    } else if (!Array.isArray(values)) values = [values];
    else values = values.slice();
    return values;
  }
  var result = {};
  var input = [];
  var output = expand(args.axiom);
  var input_index = 0;
  var output_index = 0;
  var rules = [];
  for (var index = 0; index < args.rules.length; ++index) {
    var rule = args.rules[index];
    rules.push({
      before: rule.before,
      after: expand(rule.after)
    });
  }
  var advance = (result.advance = function() {
    if (++output_index >= output.length) {
      if (input_index == input.length) {
        input = output;
        input_index = 0;
        output = [];
        output_index = 0;
      }
      var empty = true;
      var before = input[input_index++];
      for (var index = 0; index < rules.length; ++index) {
        var rule = rules[index];
        if (before == rule.before) {
          var after = rule.after;
          var flattened = [];
          for (var counter = 0; counter < after.length; ++counter) {
            var data = after[counter];
            flattened.push(typeof data == "function" ? data(before) : data);
          }
          output = output.concat(flattened);
          empty = false;
          break;
        }
      }
      if (empty) output = output.concat([before]);
    }
    return result;
  });
  var next = (result.next = function() {
    var value = peek();
    advance();
    return value;
  });
  var peek = (result.peek = function() {
    return output[output_index];
  });
  return result;
}
if (typeof module !== "undefined") module.exports = lindenmayer_system;
