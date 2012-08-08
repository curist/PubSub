Usage
===============================================================================
* PubSub.sub(*event*, *subscriber*, *handler*)
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
      PubSub.sub('the_event', a, 'callback_function');
      // or
      PubSub.sub('my_very_first_event', a, a.callback_function);
      ```

  *subscriber* is optional, so you may calling sub like this

      ```javascript
      PubSub.sub('my_event', function(){...})
      ```

* PubSub.unsub(*event*, *subscriber*, *handler*)
  * *event*

      String, event name.

  * *subscriber*

      Object unsubscribing the event.

  * *handler*

      The method name or reference of the subscriber.
  
  When all 3 parameters supplied, PubSub will unsubscribe the specific matched
  event handler.

  If there are only 2 parameters and the second parameter is a function, 
  PubSub will only unsubscribe the handler, else, PubSub removes all subscription
  to the event from the subscriber.

  Examples

      ```javascript
      PubSub.unsub('event1', a, 'foo');
      PubSub.unsub('eventB', a);
      PubSub.unsub('EventX', some_method);
      ```

* PubSub.pub(*event*, *args*)
  * *event*

      String, event name.

  * *args*

      Array, arguements that will passed to the subscribed callback, optional.

  Examples

      ```javascript
      PubSub.pub('da_event');
      PubSub.pub('fruits_coming', ['apple', 'orange']);
      ```

To Run Tests
===============================================================================

    mocha -w

