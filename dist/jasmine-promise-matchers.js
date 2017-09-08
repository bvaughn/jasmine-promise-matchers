var installPromiseMatchers;

(function() {
  var $scope,
      $httpBackend,
      $timeout;

  installPromiseMatchers = function() {
    angular.mock.inject(function($injector) {
      $scope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
      $timeout = $injector.get('$timeout');
    });
  };

  var PROMISE_STATE = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  /**
   * Helper method to verify expectations and return a Jasmine-friendly info-object.
   *
   * The last 2 parameters are optional and only required for Jasmine 2.
   * For more info see http://jasmine.github.io/2.0/custom_matcher.html
   *
   * @param promise Promise to test
   * @param expectedState PROMISE_STATE enum
   * @param opt_expectedData Optional value promise was expected to reject/resolve with
   * @param opt_util Jasmine 2 utility providing its own equality method
   * @param opt_customEqualityTesters Required by opt_util equality method
   */
  var getPromiseInfo = function(promise, expectedState, opt_expectedData, opt_util, opt_customEqualityTesters) {
    var info = {};

    promise.then(
      function(data) {
        info.actualData = data;
        info.actualState = PROMISE_STATE.RESOLVED;
      },
      function(data) {
        info.actualData = data;
        info.actualState = PROMISE_STATE.REJECTED;
      });

    $scope.$apply(); // Trigger Promise resolution

    if (!info.actualState) {
      // Trigger $httpBackend flush if any requests are pending
      try {
        $httpBackend.flush();
      } catch (err) {
        if (err.message !== 'No pending request to flush !') {
          throw err;
        }
      }

      // Trigger $timeout flush if any deferred tasks are pending
      try {
        $timeout.flush();
      } catch (err) {
        if (err.message !== 'No deferred tasks to be flushed') {
          throw err;
        }
      }
    }

    info.message = 'Expected ' + info.actualState + ' to be ' + expectedState;
    info.pass = info.actualState === expectedState;

    // If resolve/reject expectations have been made, check the data..
    if (opt_expectedData !== undefined && info.pass) {

      // Jasmine 2
      if (opt_util) {
        // Detect Jasmine's asymmetric equality matchers and use Jasmine's own equality test for them
        // Otherwise use Angular's equality check since it ignores properties that are functions
        if (opt_expectedData && opt_expectedData.asymmetricMatch) {
          info.pass = opt_util.equals(info.actualData, opt_expectedData, opt_customEqualityTesters);
        } else {
          info.pass = angular.equals(info.actualData, opt_expectedData);
        }

      // Jasmine 1.3
      } else {
        if (opt_expectedData instanceof jasmine.Matchers.Any ||
            opt_expectedData instanceof jasmine.Matchers.ObjectContaining) {
          info.pass = opt_expectedData.jasmineMatches(info.actualData);
        } else {
          info.pass = angular.equals(info.actualData, opt_expectedData);
        }
      }

      var actual = typeof info.actualData === 'object' ? JSON.stringify(info.actualData) : info.actualData;
      var expected = typeof opt_expectedData === 'object' ? JSON.stringify(opt_expectedData) : opt_expectedData;

      info.message = 'Expected ' + actual + ' to be ' + expected;
    }

    return info;
  };

  var isPromise = function(value) {
    return {
      message: 'Expected ' + value + ' to be a Promise',
      pass: value && value.then instanceof Function
    };
  };

  // Jasmine 1.x style matchers
  var jasmine1Matchers = {
    toBePromise: function() {
      return isPromise(this.actual);
    },
    toBeRejected: function() {
      return getPromiseInfo(this.actual, PROMISE_STATE.REJECTED).pass;
    },
    toBeRejectedWith: function(expectedData) {
      return getPromiseInfo(this.actual, PROMISE_STATE.REJECTED, expectedData).pass;
    },
    toBeResolved: function() {
      return getPromiseInfo(this.actual, PROMISE_STATE.RESOLVED).pass;
    },
    toBeResolvedWith: function(expectedData) {
      return getPromiseInfo(this.actual, PROMISE_STATE.RESOLVED, expectedData).pass;
    }
  };

  // Jasmine 2.x style matchers
  var jasmine2Matchers = {
    toBePromise: function() {
      return {
        compare: function(promise) {
          return isPromise(promise);
        }
      };
    },
    toBeRejected: function() {
      return {
        compare: function(promise) {
          return getPromiseInfo(promise, PROMISE_STATE.REJECTED);
        }
      };
    },
    toBeRejectedWith: function(util, customEqualityTesters) {
      return {
        compare: function(promise, expectedData) {
          return getPromiseInfo(promise, PROMISE_STATE.REJECTED, expectedData, util, customEqualityTesters);
        }
      };
    },
    toBeResolved: function() {
      return {
        compare: function(promise) {
          return getPromiseInfo(promise, PROMISE_STATE.RESOLVED);
        }
      };
    },
    toBeResolvedWith: function(util, customEqualityTesters) {
      return {
        compare: function(promise, expectedData) {
          return getPromiseInfo(promise, PROMISE_STATE.RESOLVED, expectedData, util, customEqualityTesters);
        }
      };
    }
  };

  // Detect which version of Jasmine we are running under
  var isJasmine2 = /^2/.test(jasmine.version);

  // Install the appropriate set of matchers based on which Jasmine version we're running with
  beforeEach(function() {
    if (isJasmine2) {
      jasmine.addMatchers(jasmine2Matchers);
    } else {
      this.addMatchers(jasmine1Matchers);
    }
  });
})();
