(function() {
  var $rootScope;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
  }));

  var PROMISE_STATE = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  var getPromiseInfo = function(promise, expectedState, expectedData) {
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

    $rootScope.$apply(); // Trigger Promise resolution

    info.message = 'Expected ' + info.actualState + ' to be ' + expectedState;
    info.pass = info.actualState === expectedState;

    if (expectedData !== undefined && info.pass) {
      if (jasmine.ObjectContaining && expectedData instanceof jasmine.ObjectContaining) {
        info.pass = expectedData.asymmetricMatch(info.actualData);
      } else {
        info.pass = angular.equals(info.actualData, expectedData);
      }

      var actual = typeof info.actualData === 'object' ? JSON.stringify(info.actualData) : info.actualData;
      var expected = typeof expectedData === 'object' ? JSON.stringify(expectedData) : expectedData;

      info.message = 'Expected ' + actual + ' to be ' + expected;
    }

    return info;
  };

  var jasmine1Matchers = {
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

  var jasmine2Matchers = {
    toBeRejected: function() {
      return {
        compare: function(promise) {
          return getPromiseInfo(promise, PROMISE_STATE.REJECTED);
        }
      };
    },
    toBeRejectedWith: function() {
      return {
        compare: function(promise, expectedData) {
          return getPromiseInfo(promise, PROMISE_STATE.REJECTED, expectedData);
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
    toBeResolvedWith: function() {
      return {
        compare: function(promise, expectedData) {
          return getPromiseInfo(promise, PROMISE_STATE.RESOLVED, expectedData);
        }
      };
    }
  };

  beforeEach(function() {
    if (/^2/.test(jasmine.version)) {
      jasmine.addMatchers(jasmine2Matchers);
    } else {
      this.addMatchers(jasmine1Matchers);
    }
  });
})();
