Jasmine Promise Matchers
================

Custom matchers for **[Angular promises](http://docs.angularjs.org/api/ng/service/$q)** and **[Jasmine 1.3 - 2.2](jasmine.github.io/)**.

# Overview

Tests often require simple assertions about Promise resolution/rejection. This could be accomplished by spying on the Promise object *or* by chaining on another Promise (complete with *expects* statements)- but this is a lot of work. The following matchers allow basic assertions to be made about Promises via a brief expectation.

(Note that each of the below matchers triggers a `$rootScope` digest so that their resolve/reject methods will be triggered. You do not need to trigger this digest yourself but should be aware of it in case it impacts other asynchronous portions of your test.)


# Installation

```
bower install jasmine-promise-matchers --save-dev
npm install jasmine-promise-matchers --save-dev
```

# Matchers

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
