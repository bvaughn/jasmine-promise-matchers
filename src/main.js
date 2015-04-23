/**
 * Matcher helpers for tests involving Promises.
 * These matchers do not have access to $rootScope and so you must invoke the digest loop for them after setting up expectations.
 *
 * For example:
 *   expect(promise).toBeRejected();
 *   $rootScope.$apply();
 */

beforeEach(function() {
  promiseStack = [];
  addPromise = function(){
    promiseStack.push(null);
  };
  removePromise = function(){
    promiseStack.pop();
  };
  jasmine.addMatchers({
    toBeRejected: function() {
      addPromise();
      return {
        compare: function(promise) {
          promise.then(
            function() {
              removePromise();
              expect('Promise').toBe('rejected');
            },
            function() {
              removePromise();
            });

          return { pass: true };
        }
      };
    },
    toBeRejectedWith: function() {
      addPromise();
      return {
        compare: function(promise, expected) {
          promise.then(
            function() {
              removePromise();
              expect('Promise').toBe('rejected');
            },
            function(actual) {
              removePromise();
              expect(actual).toEqual(expected);
            });

          return { pass: true };
        }
      };
    },
    toBeResolved: function() {
      addPromise();
      return {
        compare: function(promise) {
          promise.then(
            function() {
              removePromise();
            },
            function() {
              removePromise();
              expect('Promise').toBe('resolved');
          });

          return { pass: true };
        }
      };
    },
    toBeResolvedWith: function() {
      addPromise();
      return {
        compare: function(promise, expected) {
          promise.then(
            function(actual) {
              removePromise();
              expect(actual).toEqual(expected);
            }, 
            function() {
              removePromise();
              expect('Promise').toBe('resolved');
            });
          return { pass: true };
        }
      };
    },

  });
});

afterEach(function() {
  expect(promiseStack.length).toBe(0);
});