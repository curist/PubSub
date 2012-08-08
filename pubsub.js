(function(){
  var pub_sub = this.PubSub = {};
  var events = {};

  var process_arguments = function(subscriber, handler) {
    var args = {
      subscriber: subscriber
    , handler:    handler
    };

    if(args.handler === undefined) {
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
    for(var i = 0; i < events[event].length; i++) {
      var el = events[event][i];
      (el.handler).apply(el.subscriber, args || []);
    }
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
  }

  pub_sub.unsub = function(event, subscriber, handler) {
    var args = process_arguments(subscriber, handler);
    if(!args)return;

    var subscribers = [];
    for(var i = 0; i < events[event].length; i++) {
      var el = events[event][i];
      if(args.subscriber !== el.subscriber) {
        subscribers.push(el);
      } else if(args.handler && args.handler !== el.handler){
        subscribers.push(el);
      }
    }
    events[event] = subscribers;
  }
  return pub_sub;
})();
