'use strict';

// Allows for testing with angular.mock.module
angular.module('foobar', []);

describe('Promise Matcher tests', function () {
  var deferred,
      $http,
      $httpBackend,
      $timeout;

  beforeEach(function() {
    angular.mock.module('foobar');

    installPromiseMatchers();

    inject(function($q,
                    _$http_,
                    _$httpBackend_,
                    _$timeout_) {
      deferred = $q.defer();
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      $timeout = _$timeout_;
    });
  });

  it('should recognized already-resolved promises as being resolved', function() {
    deferred.resolve();

    expect(deferred.promise).toBeResolved();
  });

  it('should recognized already-resolved promises as being resolved with expected arguments', function() {
    deferred.resolve('foobar');

    expect(deferred.promise).toBeResolvedWith('foobar');
  });

  it('should not accept pending promises as resolved', function() {
    expect(deferred.promise).not.toBeResolved();
  });

  it('should not accept rejected promises as resolved', function() {
    deferred.reject();

    expect(deferred.promise).not.toBeResolved();
  });

  it('should not accept promises resolved with unexpected arguments', function() {
    deferred.resolve('foo');

    expect(deferred.promise).not.toBeResolvedWith('bar');
  });

  it('should allow usage of objectContaining matchers in expectations in already-resolved', function() {
    deferred.resolve({someProperty: 'someValue', somethingElse: 'dontCare'});

    expect(deferred.promise).toBeResolvedWith(jasmine.objectContaining({someProperty: 'someValue'}));
  });

  it('should allow usage of any matchers in expectations in already-resolved', function() {
    deferred.resolve('foobar');

    expect(deferred.promise).toBeResolvedWith(jasmine.any(String));
  });

  it('should recognized already-rejected promises as being rejected', function() {
    deferred.reject();

    expect(deferred.promise).toBeRejected();
  });

  it('should recognized already-rejected promises as being rejected with expected arguments', function() {
    deferred.reject('foobar');

    expect(deferred.promise).toBeRejectedWith('foobar');
  });

  it('should allow usage of objectContaining matchers in expectations in already-rejected', function() {
    deferred.reject({someProperty: 'someValue', somethingElse: 'dontCare'});

    expect(deferred.promise).toBeRejectedWith(jasmine.objectContaining({someProperty: 'someValue'}));
  });

  it('should allow usage of any matchers in expectations in already-rejected', function() {
    deferred.reject('foobar');

    expect(deferred.promise).toBeRejectedWith(jasmine.any(String));
  });

  it('should not accept pending promises as rejected', function() {
    expect(deferred.promise).not.toBeRejected();
  });

  it('should not accept resolved promises as rejected', function() {
    deferred.resolve();

    expect(deferred.promise).not.toBeRejected();
  });

  it('should not accept promises rejected with unexpected arguments', function() {
    deferred.reject('foo');

    expect(deferred.promise).not.toBeRejectedWith('bar');
  });

  it('should recognized $q promises as promises', function() {
    expect(deferred.promise).toBePromise();
  });

  it('should recognized things that are not $q promises as such', function() {
    expect(undefined).not.toBePromise();
    expect(null).not.toBePromise();
    expect('').not.toBePromise();
    expect('foo').not.toBePromise();
    expect(1).not.toBePromise();
    expect({}).not.toBePromise();
  });

  it('should ignore functions when evaulating equality (unless a Jasmine asymmetric equality matcher has been used)', function() {
    var objectA = {
      foo: 'bar',
      baz: function() {}
    };
    var objectB = {
      foo: 'bar',
      baz: function() {}
    };

    deferred.resolve(objectA);

    expect(deferred.promise).toBeResolvedWith(objectB);
  });

  it('should flush pending $timeouts', function() {
    $timeout(function() {
      deferred.resolve();
    }, 1000);

    expect(deferred.promise).toBeResolved();
  });

  it('should flush pending $http requests', function() {
    $httpBackend.expectGET('/test').respond(200);
    expect($http.get('/test')).toBeResolved();
  });

  it('should not call $httpBackend.flush() when the promise is already resolved', function () {
    spyOn($httpBackend, 'flush');
    deferred.resolve();
    expect(deferred.promise).toBeResolved();
    expect($httpBackend.flush).not.toHaveBeenCalled();
  });
  it('should not call $timeout.flush() when the promise is already resolved', function () {
    spyOn($timeout, 'flush');
    deferred.resolve();
    expect(deferred.promise).toBeResolved();
    expect($timeout.flush).not.toHaveBeenCalled();
  });
});
