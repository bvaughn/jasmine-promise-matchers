Jasmine Promise Matchers
================

Custom matchers for use with **[Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html)** and **[Angular promises](http://docs.angularjs.org/api/ng/service/$q).

# Installing

`bower install jasmine-promise-matchers --save`

# API

Tests often require simple assertions about Promise resolution/rejection. This could be accomplished by spying on the Promise object *or* by chaining on another Promise (complete with *expects* statements)- but this is a lot of work. The following matchers allow basic assertions to be made about Promises via a brief expectation.

Don't forget to trigger the digest loop after using one of these matchers!

### toBeRejected
Verifies that a Promise is rejected before the end of the test. Sample usage:
>`expect(promise).toBeRejected();`

### toBeRejectedWith
Verifies that a Promise is rejected with the specified parameter before the end of the test. Sample usage:
>`expect(promise).toBeRejectedWith('something');`

### toBeResolved
Verifies that a Promise is resolved before the end of the test. Sample usage:
>`expect(promise).toBeResolved();`

### toBeResolvedWith
Verifies that a Promise is resolved with the specified parameter before the end of the test. Sample usage:
>`expect(promise).toBeResolvedWith('something');`

## Objects

Jasmine 2.0 offers partial Object matching via the `jasmine.objectContaining` mechanism but its syntax is pretty ugly. The following matchers allow simple assertions to be made against an Objects keys or key-value pairs without requiring use of `jasmine.objectContaining`.

### toContainKeys

Verifies that an Object contains a minimum set of specified keys. These keys can be provided in the form of an Array:
>`expect({foo: 1, bar: 2}).toContainKeys(['foo']);`

Or an object:
>`expect({foo: 1, bar: 2}).toContainKeys({bar: 2});`

Additional keys beyond the ones specified are ignored.

### toContainValues

Verifies that an Object contains a minimum set of specified key-value pairs.
>`expect({foo: 1, bar: 2}).toContainValues({foo: 1});`

Additional keys beyond the ones specified are ignored.
