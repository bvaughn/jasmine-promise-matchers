Jasmine Promise Matchers
================

Custom matchers for **[Angular promises](http://docs.angularjs.org/api/ng/service/$q)** and **[Jasmine 1.3 - 2.x](https://jasmine.github.io/)**.

# Overview

Tests often require simple assertions about Promise resolution/rejection. This could be accomplished by spying on the Promise object *or* by chaining on another Promise (complete with *expects* statements)- but this is a lot of work. The following matchers allow basic assertions to be made about Promises via a brief expectation.

(Note that each of the below matchers triggers a `$rootScope` digest so that their resolve/reject methods will be triggered. You do not need to trigger this digest yourself but should be aware of it in case it impacts other asynchronous portions of your test.)


# Installation

First install the library using NPM or Bower like so:

```
bower install jasmine-promise-matchers --save-dev
npm install jasmine-promise-matchers --save-dev
```

Then modify your `karma.conf.js` config file to load the library like so:

```javascript
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      "node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js"
      // Your source (e.g. source/**/*.js)
      // Your tests (e.g. tests/**/*.js)
    ]
    // Other configuration
  });
};

```

Lastly be sure to load the custom Jasmine matchers before your tests run like so:

```javascript
  beforeEach(function() {
    angular.mock.module('your-module');

    installPromiseMatchers();

    inject(function() {
      // Your injected services
    });
  });
```

By default, this matcher flushes `$httpBackend`, `$interval`, and `$timeout` automatically. This can be overridden when installing the matcher like so:

```javascript
  beforeEach(function() {
    installPromiseMatchers({
      flushHttpBackend: false,
      flushInterval: false,
      flushTimeout: false
    });
  });
```


Be sure to call [`angular.mock.module`](https://docs.angularjs.org/api/ngMock/function/angular.mock.module) before installing the promise matcher library (because the promise matcher installer uses the `injector`).


# Sublime Plugin

[@Hyzual](https://github.com/Hyzual) has created a Sublime plugin for this library. Find our more info about that plugin [here](https://packagecontrol.io/packages/Jasmine%20Promise%20Matchers).


# Matchers

### toBePromise
Verifies that a value is a $q Promise.
```js
expect(promise).toBePromise();
```

### toBeRejected
Verifies that a Promise is (or has been) rejected.
```js
expect(promise).toBeRejected();
```

### toBeRejectedWith
Verifies that a Promise is (or has been) rejected with the specified parameter.
```js
expect(promise).toBeRejectedWith('something');

// Asymmetric matching is also supported for objects:
expect(promise).toBeRejectedWith(jasmine.objectContaining({partial: 'match'}));
```

### toBeResolved
Verifies that a Promise is (or has been) resolved.
```js
expect(promise).toBeResolved();
```

### toBeResolvedWith
Verifies that a Promise is (or has been) resolved with the specified parameter.
```js
expect(promise).toBeResolvedWith('something');

// Asymmetric matching is also supported for objects:
expect(promise).toBeResolvedWith(jasmine.objectContaining({partial: 'match'}));
```

# Development

If you'd like to contribute to this project you'll need to initialize it like so:
```
npm i -g karma
cd <path-to-project>
npm i
cd jasmine-1.3
npm i
cd ../jasmine-2.2
npm i
```

At this point you should be able to build via `grunt build` and run unit tests via `grunt test`. Tests will be run against both Jasmine 1.3 and 2.2 flavors.
