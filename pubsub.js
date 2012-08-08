(function(){
  var that = this;
  pub_sub = that.PubSub = {};
  var events = {};
  pub_sub.pub = function(event, args) {
    for(var i = 0; i < events[event].length; i++) {
      var el = events[event][i];
      el.subscriber[el.handler].apply(el.subscriber, args || []);
    }
  };

  pub_sub.sub = function(event, subscriber, handler) {
    if (!events.hasOwnProperty(event)) {
      events[event] = [];
    }
    events[event].push({
      subscriber: subscriber
    , handler:    handler
    });
  }

  pub_sub.unsub = function(event, subscriber, handler) {
    var subscribers = [];
    for(var i = 0; i < events[event].length; i++) {
      var el = events[event][i];
      if(subscriber !== el.subscriber) {
        subscribers.push(el);
      } else if(handler && handler !== el.handler){
        subscribers.push(el);
      }
    }
    events[event] = subscribers;
  }
  return pub_sub;
})();
