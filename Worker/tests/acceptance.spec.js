const expect = require('expect');
const sinon = require('sinon');
const worker = require('../');
const testFn = function (val, index, cb) {
  var self = this;
  setTimeout(function () {
    cb(null, self.message);
  }, self.time);
};

const works = [
  1,
  2,
  3,
  4
];

describe.only('Worker :: Acceptance', function () {
  var expectedErrors = null;
  var expectedResults = null;
  before(function (done) {
    this.timeout(5000);
    worker(works, { limit: 2 }, testFn, function (err, result) {
      expectedErrors = err;
      expectedResults = result;
      done();
    });
  });

  it('Should return no errors', function () {
    expect(expectedErrors).toBe(null);
  });

  it('Results should be an array', function () {
    expect(expectedResults).toNotBe(null);
    expect(Array.isArray(expectedResults)).toBe(true);
  });

  it('Should return results with specific order', function () {
    expect(expectedResults.length).toEqual(3);
    expect(expectedResults[0]).toEqual('aaa');
    expect(expectedResults[1]).toEqual('bbb');
    expect(expectedResults[2]).toEqual('ccc');
  });
});