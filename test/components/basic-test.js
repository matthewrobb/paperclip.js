var assert     = require("assert"),
template       = require("../../lib/template"),
parser         = require("../../lib/parser"),
Component      = require("../..").Component,
stringifyView = require("../utils/stringifyView")

/*

var tpl = paperclip.template("abba")
*/

describe(__filename + "#", function () {


  it("can register a component", function () {

    var helloTpl = template("hello world");

    var v = template("<hello />", {
      components: {
        hello: helloTpl.createComponentClass()
      }
    }).view();

    assert.equal(stringifyView(v), "hello world");
  });

  it("can register a component with a sub component", function () {

    var at = template("a {{name}}"),
    bt     = template("b <at name={{name}} />", { components: { at: at.createComponentClass() }}),
    ct     = template("c <bt name={{name}} />", { components: { bt: bt.createComponentClass() }});

    var v = ct.view({name:"d"});

    assert.equal(stringifyView(v), "c b a d");
  });


  it("can re-bind a template component", function () {

    var at = template("a {{name}}"),
    bt     = template("b <at name={{name}} />", { components: { at: at.createComponentClass() }}),
    ct     = template("c <bt name={{name}} />", { components: { bt: bt.createComponentClass() }});

    var v = ct.view({name:"d"});

    assert.equal(stringifyView(v), "c b a d");

    v.bind({ name: "e" });
    assert.equal(stringifyView(v), "c b a e");

  });

  it("can unbind before binding", function () {

    var at = template("a {{name}}"),
    bt     = template("b <at name={{name}} />", { components: { at: at.createComponentClass() }}),
    ct     = template("c <bt name={{name}} />", { components: { bt: bt.createComponentClass() }});

    var v = ct.view();
    v.unbind();

    v.bind({ name: "e" });
    assert.equal(stringifyView(v), "c b a e");

  });

  it("can register a very basic repeat component", function () {

    function repeatComponent (options) {

      var attrs = options.attributes;


      var count = Number(attrs.count),
      as        = attrs.as || "model";

      for (var i = 0; i < count; i++) {
        var model = {};
        model[as] = i;
        options.section.appendChild(options.childTemplate.view(model).render());
      }
    };

    var tpl = template("<repeat count='5' as='number'>{{number}}</repeat>", { components:{repeat:repeatComponent}});
    var v = tpl.view({});

    assert.equal(stringifyView(v), "01234");
  });

  it("can register a dynamic repeat component", function () {

    function repeatComponent (options) {
      var attrs = options.attributes;

      function render () {
        options.section.removeAll();
        for (var i = 0; i < attrs.count; i++) {
          var model = {};
          model[attrs.as] = i;
          options.section.appendChild(options.childTemplate.view(model).render());
        }
      }

      this.attributes = attrs;
      this.update = render;

      this.bind = function (context) {
        render();
      }
    }

    var tpl = template("<repeat count={{count}} as='number'>{{number}}</repeat>", { components:{repeat:repeatComponent}});
    var v = tpl.view({count:5});
    assert.equal(stringifyView(v), "01234");
    v.set("count", 3);
    v.accessor.apply();
    v.runloop.runNow();
    assert.equal(stringifyView(v), "012");
    v.set("count", 8);
    v.accessor.apply();
    v.runloop.runNow();
    assert.equal(stringifyView(v), "01234567");
  });

  it("can register a dynamic repeat component with embedded components", function () {

    var RepeatComponent = Component.extend({
      update: function () {
        this.section.removeAll();

        var count = Number(this.attributes.count || 0),
        as = this.attributes.as || "model";

        for (var i = 0; i < count; i++) {
          var model = {};
          model[as] = i;
          this.section.appendChild(this.childTemplate.view(model).render());
        }
      }
    });


    var tpl = template("<repeat count='5' as='number'>a<show value={{number}} /></repeat>", {
      components: {
        repeat: RepeatComponent,
        show: Component.extend({
          initialize: function () {
            this.section.appendChild(this.node = this.document.createTextNode(""));
          },
          update: function () {
            if (this.document.name === "dom") {
              this.node.nodeValue = "b" + this.attributes.value;
            } else {
              this.node.replaceText("b" + this.attributes.value);
            }
          }
        })
      }
    });

    var v = tpl.view({});

    assert.equal(stringifyView(v), "ab0ab1ab2ab3ab4");
  });

  it("automatically converts dashes to camelCase", function() {

    var tpl = template("<say-hello message={{message}} />", {
      components: {
        sayHello: Component.extend({
          initialize: function () {
            this._node = this.document.createTextNode("");
            this.section.appendChild(this._node);
          },
          update: function() {
            this._node.replaceText(this.attributes.message);
          }
        })
      }
    });

    var v = tpl.view({ message: "abba" });
    assert.equal(stringifyView(v), "abba");
    v.set("message", "baab");
    v.runloop.runNow();
    assert.equal(stringifyView(v), "baab");
  });

});
