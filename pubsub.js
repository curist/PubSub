(function(undefined){
  var pub_sub = {};
  if(!(module && module.exports)) {
    this.PubSub = pub_sub;
  }
  var events = {};

  // since we allow subscriber as optional argument, will preprocess args here
  var process_arguments = function(subscriber, handler) {
    var args = {
      subscriber: subscriber
    , handler:    handler
    };

    if(args.handler === undefined && typeof args.subscriber === 'function') {
      args.handler = args.subscriber;
      args.subscriber = 'anonymous';
    } else if(typeof args.handler !== 'function') {
      if(!(args.subscriber.hasOwnProperty(args.handler))){
        return;
      }
      if(typeof args.subscriber[args.handler] !== 'function'){
        return;
      }
      args.handler = args.subscriber[args.handler];
    }

    return args;
  };

  pub_sub.pub = function(event, args) {
    events[event].forEach(function(el){
      (el.handler).apply(el.subscriber, args || []);
    });
  };

  pub_sub.sub = function(event, subscriber, handler) {
    var args = process_arguments(subscriber, handler);
    if(!args)return;

    if (!events.hasOwnProperty(event)) {
      events[event] = [];
    }
    events[event].push({
      subscriber: args.subscriber
    , handler:    args.handler
    });
  };

  pub_sub.unsub = function(event, subscriber, handler) {
    var args = process_arguments(subscriber, handler);
    if(!args)return;

    var subscribers = [];
    events[event].forEach(function(el){
      if(args.subscriber !== el.subscriber) {
        subscribers.push(el);
      } else if(args.handler && args.handler !== el.handler){
        subscribers.push(el);
      }
    });
    events[event] = subscribers;
  };

  // export methods if nodejs environment detected
  if(module && module.exports) {
    module.exports.sub = pub_sub.sub;
    module.exports.pub = pub_sub.pub;
    module.exports.unsub = pub_sub.unsub;
  }

  return pub_sub;
})();
