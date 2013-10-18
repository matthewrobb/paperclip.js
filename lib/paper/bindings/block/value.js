// Generated by CoffeeScript 1.6.2
var ValueDecor, escapeHTML, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

escapeHTML = require("../../utils/escapeHTML");

ValueDecor = (function(_super) {
  __extends(ValueDecor, _super);

  function ValueDecor() {
    _ref = ValueDecor.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  ValueDecor.prototype._onChange = function(value) {
    if (value == null) {
      value = "";
    }
    return this.section.replaceChildNodes(this.nodeFactory.createTextNode(String(value)));
  };

  return ValueDecor;

})(require("./base"));

module.exports = ValueDecor;