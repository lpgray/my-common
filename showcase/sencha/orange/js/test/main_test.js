( function($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('module-1', {
      // This will run before each test in this module.
      setup : function() {
        this.name = "module-1";
      }
    });
    
    test('First', function() {
      expect(1);
      // Not a bad test to run on collection methods.
      equal(1, true, 'first test case');
    });
    
  }(jQuery));
