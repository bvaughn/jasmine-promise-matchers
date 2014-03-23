'use strict';

describe('Promise Matcher tests', function () {

  var $q;
  var $rootScope;

  beforeEach(inject(function($injector) {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
  }));

  afterEach(inject(function($injector) {
    $rootScope.$apply();
  }));

  it('should recognized already-resolved promises as being resolved', function() {
    var deferred = $q.defer();
    deferred.resolve();

    expect(deferred.promise).toBeResolved();
  });

  it('should recognized already-resolved promises as being resolved with expected arguments', function() {
    var deferred = $q.defer();
    deferred.resolve('foobar');

    expect(deferred.promise).toBeResolvedWith('foobar');
  });

  it('should recognized to-be-resolved promises as being resolved', function() {
    var deferred = $q.defer();

    expect(deferred.promise).toBeResolved();

    deferred.resolve();
  });

  it('should recognized to-be-resolved promises as being resolved with expected arguments', function() {
    var deferred = $q.defer();

    expect(deferred.promise).toBeResolvedWith('foobar');

    deferred.resolve('foobar');
  });

  it('should recognized already-rejected promises as being rejected', function() {
    var deferred = $q.defer();
    deferred.reject();

    expect(deferred.promise).toBeRejected();
  });

  it('should recognized already-rejected promises as being rejected with expected arguments', function() {
    var deferred = $q.defer();
    deferred.reject('foobar');

    expect(deferred.promise).toBeRejectedWith('foobar');
  });

  it('should recognized to-be-rejected promises as being rejected', function() {
    var deferred = $q.defer();

    expect(deferred.promise).toBeRejected();

    deferred.reject();
  });

  it('should recognized to-be-rejected promises as being rejected with expected arguments', function() {
    var deferred = $q.defer();

    expect(deferred.promise).toBeRejectedWith('foobar');

    deferred.reject('foobar');
  });

});
