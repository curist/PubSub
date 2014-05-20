Usage
===============================================================================
* PbSb.sub(*event*, *subscriber*, *handler*)
  * *event*

      String, event name.

  * *subscriber*

      Object subscribing the event.

  * *handler*

      The method name or reference of the subscriber.
  
  Example

```javascript
var ClassA = function(){
  return {
    callback_function: function(){
      return 'foobar';
    }
  }
}
var a = new A();
PbSb.sub('the_event', a, 'callback_function');
// or
PbSb.sub('my_very_first_event', a, a.callback_function);
```

  *subscriber* is optional, so you may calling sub like this

```javascript
PbSb.sub('my_event', function(){...})
```

* PbSb.unsub(*event*, *subscriber*, *handler*)
  * *event*

      String, event name.

  * *subscriber*

      Object unsubscribing the event.

  * *handler*

      The method name or reference of the subscriber.
  
  When all 3 parameters supplied, `PbSb` will unsubscribe the specific matched
  event handler.

  If there are only 2 parameters and the second parameter is a function, 
  `PbSb` will only unsubscribe the handler, else, `PbSb` removes all subscription
  to the event from the subscriber.

  Examples

```javascript
PbSb.unsub('event1', a, 'foo');
PbSb.unsub('eventB', a);
PbSb.unsub('EventX', some_method);
```

* PbSb.pub(*event*, *args*)
  * *event*

      String, event name.

  * *args*

      Array, arguements that will passed to the subscribed callback, optional.

  Examples

```javascript
PbSb.pub('da_event');
PbSb.pub('fruits_coming', ['apple', 'orange']);
```

To Run Tests
===============================================================================

``` sh
npm install -g mocha
npm test
```

