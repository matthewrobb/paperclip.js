// Generated by CoffeeScript 1.6.2
(function() {
  var Clip, Expression, base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  base = require("../../../base/expression");

  Clip = require("../../../clip");

  Expression = (function(_super) {
    __extends(Expression, _super);

    Expression.prototype._type = "block";

    function Expression(value) {
      this.value = value;
    }

    Expression.prototype.toString = function() {
      return "bind(" + (Clip.compile(this.value.toString())) + ")";
    };

    return Expression;

  })(base.Expression);

  module.exports = Expression;

}).call(this);