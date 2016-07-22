const expect = require('expect');
const worker = require('../');
var globalCounter = 2;

const testFn = function (cb) {
  var self = this;
  setTimeout(function () {
    if (self.message === 'bbb') {
      globalCounter--;
      if (globalCounter === 0) {
        return cb(null, 'test success bbb');
      }
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
    expect(expectedErrors).toBe(null);
  });

  it('results should return the success message', function () {
    expect(expectedResults[1]).toBe('test success bbb');
  });

  it('results should be an array with 3 items', function () {
    expect(expectedResults.length).toEqual(3);
  });
});