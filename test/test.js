require('../pubsub.js')
var assert = require("assert")

var ClassB = function(){
  var foo = {};
  var value = 0;
  foo.increment = function(){
    value += 1;
  }
  foo.val = function(){
    return value;
  }
  return foo;
};

describe('PubSub', function(){
  it('should run subscribed method', function(){
    var b = new ClassB();
    assert.equal(0, b.val());
    PubSub.sub('event_foo', b, 'increment');
    PubSub.pub('event_foo');
    assert.equal(1, b.val());
    PubSub.pub('event_foo');
    assert.equal(2, b.val());
  }),
  it('shouldnt run unsubscribed instance\'s method',function(){
    var b1 = new ClassB();
    var b2 = new ClassB();
    assert.equal(0, b1.val());
    assert.equal(0, b2.val());
    PubSub.sub('event_foo', b1, 'increment');
    PubSub.pub('event_foo');
    assert.equal(1, b1.val());
    assert.equal(0, b2.val());
  }),
  describe('unsubscribe', function(){
    it('should allow unsubscribe with instance name', function(){
      var b = new ClassB();
      PubSub.sub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      assert.equal(1, b.val());
      PubSub.unsub('event_foo', b);
      assert.equal(1, b.val());
    }),
    it('should allow unsubscribe instance with handle name', function(){
      var b = new ClassB();
      PubSub.sub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      assert.equal(1, b.val());

      // didn't unsub 'increment'
      PubSub.unsub('event_foo', b, 'foobar');
      PubSub.pub('event_foo');
      assert.equal(2, b.val());

      // should unsub 'increment'
      PubSub.unsub('event_foo', b, 'increment');
      PubSub.pub('event_foo');
      assert.equal(2, b.val());
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
      assert.equal(1, b1.val());

    })
  })
})