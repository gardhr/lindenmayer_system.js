"use strict";
function lindenmayer_system(args) {
  if (!(this instanceof lindenmayer_system))
    return new lindenmayer_system(args);
  return this.ctor(args);
}
(function() {
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
    return values;
  }
  lindenmayer_system.prototype.ctor = function(args) {
    this.textual = is_string(args.axiom);
    this.input = [];
    this.output = expand(args.axiom);
    this.input_index = this.output_index = 0;
    this.rules = [];
    var rules = args.rules;
    for (var index = 0; index < rules.length; ++index) {
      var packed = rules[index];
      this.rules.push({
        before: normalize(packed[0]),
        after: expand(packed[1])
      });
    }
    return this;
  };
  lindenmayer_system.prototype.advance = function() {
    if (++this.output_index >= this.output.length) {
      if (this.input_index == this.input.length) {
        this.input = this.output;
        this.input_index = 0;
        this.output = [];
        this.output_index = 0;
      }
      var empty = true;
      var before = this.input[this.input_index++];
      for (var index = 0; index < this.rules.length; ++index) {
        var rule = this.rules[index];
        if (before == rule.before) {
          var after = rule.after;
          var flattened = [];
          for (var counter = 0; counter < after.length; ++counter) {
            var data = after[counter];
            flattened.push(typeof data == "function" ? data(before) : data);
          }
          this.output = this.output.concat(flattened);
          empty = false;
          break;
        }
      }
      if (empty) this.output = this.output.concat([before]);
    }
    return this;
  };
  lindenmayer_system.prototype.next = function() {
    var result = this.peek();
    this.advance();
    return result;
  };
  lindenmayer_system.prototype.peek = function() {
    var result = this.output[this.output_index];
    if (result != null && this.textual) result = String.fromCharCode(result);
    return result;
  };
})();
if (typeof exports !== "undefined") exports = lindenmayer_system;
if (typeof module !== "undefined") module.exports = lindenmayer_system;
