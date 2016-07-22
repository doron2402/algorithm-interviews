const expect = require('expect');
const worker = require('../');
const testFn = function (cb) {
  var self = this;
  setTimeout(function () {
    if (self.message === 'bbb') {
      return cb('error test');
    }
    cb(null, self.message);
  }, self.time);
};

const works = [
  testFn.bind({ time: 1000, message: 'aaa' }),
  testFn.bind({ time: 2000, message: 'bbb' }),
  testFn.bind({ time: 3000, message: 'ccc' })
];

describe('Worker :: Acceptance', function () {
  var expectedErrors = null;
  var expectedResults = null;
  before(function (done) {
    this.timeout(50000);
    worker(works, function (err, result) {
      expectedErrors = err;
      expectedResults = result;
      done();
    });
  });

  it('Should return error', function () {
    expect(expectedErrors).toNotBe(null);
  });

  it('results should be undefined', function () {
    expect(expectedResults).toBe(undefined);
  });

  it('Error should be `Repeat fail`', () => {
    expect(expectedErrors).toEqual('Repeat fail');
  });
});