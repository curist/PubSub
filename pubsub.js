(function(){
  var undef;
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

    if(args.subscriber === undef && args.handler === undef) {
      // no additional args
      args = undef;
    } else if(args.subscriber !== undef && args.handler !== undef) {
      // with subscriber and handler
      if(typeof args.handler === 'string') {
        args.handler = args.subscriber[args.handler];
      } else {
        // pass
      }
    } else {
      if(Object.keys(args.subscriber).length > 0) {
        // with subscriber
        args.handler = args.subscriber[args.handler];
      } else {
        // with handler
        args.handler = args.subscriber;
        args.subscriber = 'anonymous';
      }
    }
    return args;
  };

  pub_sub.pub = function(event, args) {
    if (!events.hasOwnProperty(event)) {
      events[event] = [];
    }
    events[event].forEach(function(el){
      (el.handler).apply(el.subscriber, args || []);
    });
  };

  pub_sub.sub = function(event, subscriber, handler) {
    var args = process_arguments(subscriber, handler);

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
    if(!args) {
      // only event name passed in
      delete events[event];
      return;
    }
    if(handler !== undef && args.handler === undef) {
      // handler not found...
      return;
    }

    var subscribers = [];
    events[event].forEach(function(el){
      if(args.subscriber !== el.subscriber) {
        subscribers.push(el);
      } else if(args.handler && (args.handler !== el.handler)) {
        subscribers.push(el);
      }
    });
    events[event] = subscribers;
  };

  // export methods if nodejs environment detected
  if(module && module.exports) {
    module.exports = pub_sub;
  }

  return pub_sub;
})();
