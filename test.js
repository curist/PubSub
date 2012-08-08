require('./pubsub.js')

var a = {}
a.foo = function(){
  console.log('foo')
  for(i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
PubSub.sub('foo', a, 'foo')

var b = {}
b.bar = function(){
  console.log('bar');
}
PubSub.sub('foo', b, 'bar')

var C = function(){
  this.val = 0;
}

C.plus = function(){
  this.val += 1;
}

PubSub.pub('foo')

PubSub.unsub('foo', b, 'barx')

PubSub.pub('foo', [1,2,3])
