var installPromiseMatchers;

(function() {
  var $scope;

  installPromiseMatchers = function() {
    inject(function($injector) {
      $scope = $injector.get('$rootScope');
    });
  };

  var PROMISE_STATE = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  // Detect which version of Jasmine we are running under
  var isJasmine2 = /^2/.test(jasmine.version);

  // Determine if data is an asymmetric match (Jasmine's objectContaining)
  var isObjectContaining = function(data) {
    if (isJasmine2) {
      return data.asymmetricMatch instanceof Function;
    } else {
      return data instanceof jasmine.Matchers.ObjectContaining;
    }
  };

  // Helper method to verify expectations and return a Jasmine-friendly info-object
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

    $scope.$apply(); // Trigger Promise resolution

    info.message = 'Expected ' + info.actualState + ' to be ' + expectedState;
    info.pass = info.actualState === expectedState;

    if (expectedData !== undefined && info.pass) {
      if (isObjectContaining(expectedData)) {
        info.pass = true;

        for (var property in expectedData.sample) {
          if (info.actualData[property] !== expectedData.sample[property]) {
            info.pass = false;
            break;
          }
        }
      } else {
        info.pass = angular.equals(info.actualData, expectedData);
      }

      var actual = typeof info.actualData === 'object' ? JSON.stringify(info.actualData) : info.actualData;
      var expected = typeof expectedData === 'object' ? JSON.stringify(expectedData) : expectedData;

      info.message = 'Expected ' + actual + ' to be ' + expected;
    }

    return info;
  };

  // Jasmine 1.x style matchers
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

  // Jasmine 2.x style matchers
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

  // Install the appropriate set of matchers based on which Jasmine version we're running with
  beforeEach(function() {
    if (isJasmine2) {
      jasmine.addMatchers(jasmine2Matchers);
    } else {
      this.addMatchers(jasmine1Matchers);
    }
  });
})();
