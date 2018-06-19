"use strict";
function lindenmayer_system(args) {
  function is_string(value) {
    return typeof value == "string";
  }
  function to_number(value) {
    return value.charCodeAt(0);
  }
  function normalize(value) {
    if (is_string(value)) return to_number(value);
    return value;
  }
  function expand(values) {
    if (is_string(values)) {
      values = values.split("");
      for (var index = 0; index < values.length; ++index)
        values[index] = to_number(values[index]);
    } else if (!Array.isArray(values)) values = [values];
    else values = values.slice();
    return values;
  }
  var that = {};
  var textual = is_string(args.axiom);
  var input = [];
  var output = expand(args.axiom);
  var input_index = 0;
  var output_index = 0;
  var rules = [];
  for (var index = 0; index < args.rules.length; ++index) {
    var rule = args.rules[index];
    rules.push({
      before: normalize(rule.before),
      after: expand(rule.after)
    });
  }
  var advance = (that.advance = function() {
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
    return that;
  });
  var next = (that.next = function() {
    var result = peek();
    advance();
    return result;
  });
  var peek = (that.peek = function() {
    var result = output[output_index];
    if (result != null && textual) result = String.fromCharCode(result);
    return result;
  });
  return that;
}
if (typeof module !== "undefined") module.exports = lindenmayer_system;
