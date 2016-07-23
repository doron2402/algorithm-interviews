const expect = require('expect');
const worker = require('../');
const testFn = function (cb) {
  var self = this;
  setTimeout(function () {
    cb(null, self.message);
  }, self.time);
};

const works = [
  testFn.bind({ time: 1000, message: 'aaa' }),
  testFn.bind({ time: 2000, message: 'bbb' }),
  testFn.bind({ time: 3000, message: 'ccc' })
];

describe.only('Worker :: When maxConcurrentTasks is 0', function () {
  var expectedErrors = null;
  var expectedResults = null;
  before(function (done) {
    this.timeout(5000);
    worker(works, { maxConcurrentTasks: 0 }, function (err, result) {
      expectedErrors = err;
      expectedResults = result;
      done();
    });
  });

  it('Error should be undefined', function () {
    expect(expectedErrors).toBe(null);
  });

  it('Results should be an emptry array', function () {
    expect(Array.isArray(expectedResults)).toBe(true);
    expect(expectedResults.length).toBe(0);
  });

});