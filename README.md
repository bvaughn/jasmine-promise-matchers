Jasmine Promise Matchers
================

Custom matchers for use with **[Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html)** and **[Angular promises](http://docs.angularjs.org/api/ng/service/$q)**.

# Installing

`bower install jasmine-promise-matchers --save`

# Documentation

Tests often require simple assertions about Promise resolution/rejection. This could be accomplished by spying on the Promise object *or* by chaining on another Promise (complete with *expects* statements)- but this is a lot of work. The following matchers allow basic assertions to be made about Promises via a brief expectation.

Don't forget to trigger the digest loop after using one of these matchers!

### toBeRejected
Verifies that a Promise is rejected before the end of the test.
>`expect(promise).toBeRejected();`

### toBeRejectedWith
Verifies that a Promise is rejected with the specified parameter before the end of the test.
>`expect(promise).toBeRejectedWith('something');`

### toBeResolved
Verifies that a Promise is resolved before the end of the test.
>`expect(promise).toBeResolved();`

### toBeResolvedWith
Verifies that a Promise is resolved with the specified parameter before the end of the test.
>`expect(promise).toBeResolvedWith('something');`

# Development

* `npm install`
* `bower install`

Run `grunt -h` to see available tasks.
