const expect = require('expect');
const sinon = require('sinon');
const worker = require('../');
var spy = sinon.spy(worker);

describe('Worker', function () {

  describe('When items is not array', function () {
    var errorMsg
    before(function () {
      try {
        spy('test');
      } catch (error) {
        errorMsg = error;
      }
    });
    it('Should throw TypeError', function () {
      var spyCall = spy.getCall(0);
      spyCall.threw("TypeError");
      expect(errorMsg).toEqual("TypeError: tasks is not a valid array");
    });
  });

  describe('When callback is not being passed', function () {
    var errorMsg
    before(function () {
      try {
        spy([1, 2]);
      } catch (error) {
        errorMsg = error;
      }
    });
    it('Should throw TypeError', function () {
      var spyCall = spy.getCall(0);
      spyCall.threw("TypeError");
      expect(errorMsg).toEqual("TypeError: Callback is not defined");
    });
  });
});