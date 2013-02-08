/*global expect: true*/
var PubSub = require("../pubsub")
  , chai   = require("chai");

chai.Assertion.includeStack = true;
Error.stackTraceLimit = 3;

var expect = chai.expect;
var assert = require('assert');

var ClassB = function(){
  var foo = {};
  var value = 0;
  foo.increment = function(){
    value += 1;
  };
  foo.val = function(){
    return value;
  };
  return foo;
};

describe('PubSub', function(){
  describe('subscribtion', function(){
    it('should run subscribed method', function(){
      var b = new ClassB();
      expect(b.val()).to.equal(0);
      PubSub.sub('event_foo', b, 'increment');

      PubSub.pub('event_foo');
      expect(b.val()).to.equal(1);

      PubSub.pub('event_foo');
      expect(b.val()).to.equal(2);
    }),
    it('should allow subscribing using callback with instance', function(){
      // though this usage might be somewhat confusing..
      var b = new ClassB();
      expect(b.val()).to.equal(0);
      PubSub.sub('my_event', b, b.increment);

      PubSub.pub('my_event');
      expect(b.val()).to.equal(1);
    }),
    it('should not run method without subscribtion',function(){
      var b1 = new ClassB();
      var b2 = new ClassB();
      expect(b1.val()).to.equal(0);
      expect(b2.val()).to.equal(0);
      PubSub.sub('event_foo', b1, 'increment');
      PubSub.pub('event_foo');
      expect(b1.val()).to.equal(1);
      expect(b2.val()).to.equal(0);
    }),
    it('should allow subscribing w/o instance but only callback', function(){
      var some_uniq_value = 41;
      var foo = function(){
        some_uniq_value += 1;
      };
      PubSub.sub('the_answer', foo);
      PubSub.pub('the_answer');
      expect(some_uniq_value).to.equal(42);
    });
  }),
  describe('unsubscribe', function(){
    it('should allow unsubscribe with only event name', function() {
      var b = new ClassB();

      PubSub.sub('okay', b.increment);
      PubSub.pub('okay');
      expect(b.val()).to.equal(1);

      PubSub.unsub('okay');
      PubSub.pub('okay');
      expect(b.val()).to.equal(1);
    }),
    it('should allow unsubscribe with instance name', function(){
      var b = new ClassB();
      PubSub.sub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      expect(b.val()).to.equal(1);
      PubSub.unsub('event_foo', b);
      PubSub.pub('event_foo');
      expect(b.val()).to.equal(1);
    }),
    it('should allow unsubscribe instance with handle name', function(){
      var b = new ClassB();
      PubSub.sub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      expect(b.val()).to.equal(1);

      // didn't unsub 'increment'
      PubSub.unsub('event_foo', b, 'foobar');
      PubSub.pub('event_foo');
      expect(b.val()).to.equal(2);

      // should unsub 'increment'
      PubSub.unsub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      expect(b.val()).to.equal(2);
    }),
    it('should allow unsubscribe using callback with instance', function(){
      var b = new ClassB();
      expect(b.val()).to.equal(0);
      PubSub.sub('my_event', b, b.increment);

      PubSub.pub('my_event');
      expect(b.val()).to.equal(1);

      PubSub.unsub('my_event', b, b.increment);
      PubSub.pub('my_event');
      expect(b.val()).to.equal(1);
    }),
    it('should not affect other subscriber when some unsubscribed', function(){
      var b1 = new ClassB();
      var b2 = new ClassB();
      assert.equal(0, b1.val());
      assert.equal(0, b2.val());
      PubSub.sub('event_foo', b1, 'increment');
      PubSub.sub('event_foo', b2, 'increment');
      PubSub.unsub('event_foo', b2);
      PubSub.pub('event_foo');
      expect(b1.val()).to.equal(1);

    }),
    it('should allow unsubscribing w/o instance but only callback', function(){
      var some_uniq_value = 41;
      var foo = function(){
        some_uniq_value += 1;
      };
      PubSub.sub('the_answer', foo);
      PubSub.pub('the_answer');
      expect(some_uniq_value).to.equal(42);
      PubSub.unsub('the_answer', foo);
      PubSub.pub('the_answer');
      expect(some_uniq_value).to.equal(42);
    });
  });
});
