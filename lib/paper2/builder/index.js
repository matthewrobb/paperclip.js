// Generated by CoffeeScript 1.6.2
var Base, BlockBinding, Builder, NodeBinding, String, TextBinding, async, b, bindable, node,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require("./base");

async = require("async");

String = require("./string");

bindable = require("bindable");

NodeBinding = require("./nodeBinding");

TextBinding = require("./textBinding");

BlockBinding = require("./blockBinding");

Builder = (function(_super) {
  __extends(Builder, _super);

  /*
  */


  function Builder(factory) {
    this.factory = factory;
    Builder.__super__.constructor.call(this);
  }

  /*
  */


  Builder.prototype.build = function() {
    this.factory.call(this);
    return this;
  };

  /* 
   just an html buffer
  */


  Builder.prototype.html = function(content) {
    this.addChild(new String(content));
    return this;
  };

  /*
   Node which has a binding
  */


  Builder.prototype.nodeBinding = function(name, options) {
    this.addChild(new NodeBinding(name, options));
    return this;
  };

  /*
   binding with children
  */


  Builder.prototype.blockBinding = function(name, children) {
    this.addChild(new BlockBinding(name, children));
    return this;
  };

  /*
    single-line text binding
  */


  Builder.prototype.textBinding = function(binding) {
    this.addChild(new TextBinding(binding));
    return this;
  };

  return Builder;

})(require("./base"));

module.exports = Builder;

b = new Builder(require("../../../test"));

node = b.build();

node.write({
  data: new bindable.Object({
    name: "craig"
  }),
  buffer: []
}, function(err, content) {
  return console.log(JSON.stringify(content, null, 2));
});