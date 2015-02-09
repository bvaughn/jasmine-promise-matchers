/**
 * Matcher helpers for tests involving Promises.
 * These matchers do not have access to $rootScope and so you must invoke the digest loop for them after setting up expectations.
 *
 * For example:
 *   expect(promise).toBeRejected();
 *   $rootScope.$apply();
 */

beforeEach(function() {
  jasmine.addMatchers({
    toBeRejected: function() {
      return {
        compare: function(promise) {
          promise.then(
            function() {
              expect('Promise').toBe('rejected');
            },
            angular.noop);

          return { pass: true };
        }
      };
    },
    toBeRejectedWith: function() {
      return {
        compare: function(promise, expected) {
          promise.then(
            function() {
              expect('Promise').toBe('rejected');
            },
            function(actual) {
              expect(actual).toEqual(expected);
            });

          return { pass: true };
        }
      };
    },
    toBeResolved: function() {
      return {
        compare: function(promise) {
          promise.then(
            angular.noop,
            function() {
              expect('Promise').toBe('resolved');
          });

          return { pass: true };
        }
      };
    },
    toBeResolvedWith: function() {
      return {
        compare: function(promise, expected) {
          promise.then(
            function(actual) {
              expect(actual).toEqual(expected);
            },
            function() {
              expect('Promise').toBe('resolved');
            });

          return { pass: true };
        }
      };
    }
  });
});
