// see: http://sirupsen.com/production-docker/
var _ = require('underscore');

var CallLogger = function() {};

var store = {
    incoming: [],
    outgoing: []
};

CallLogger.prototype = {

    recordIncomingCall: function(caller, duration) {
        store.incoming.push({
            name: caller,
            duration: duration
        });
    },

    recordOutgoingCall: function(callee, duration) {
        store.outgoing.push({
            name: callee,
            duration: duration
        });
    },

    getLongestCalled: function() {
        var arr = store.outgoing.concat(store.incoming);

        /// memo = { callers: [ ] , duration: max_call_seen }
        // ex: memo = { callers: ["tom", "jil"], duration: 10}

        var res = {
            callers: [],
            duration: null
        };
        var updateMaxValue = function(obj) {
            if (res.duration && res.duration === obj.duration) {
                res.callers.push(obj.name);
                res.duration = obj.duration;
            } else if (res.duration < obj.duration) {
                res.callers = [obj.name];
                res.duration = obj.duration;
            } else if (!res.duration) {
                res.callers = [obj.name];
                res.duration = obj.duration;
            }
        }

        _.map(arr, updateMaxValue);
        return res.callers;

    },

    getLongestCalledUsingReduce: function() {
        var arr = store.outgoing.concat(store.incoming);
        var reductFuncGetLogestCalles = function(memo, curr, index){
          if (memo && curr.duration > memo.duration){
              memo.name = [curr.name];
              memo.duration = curr.duration;
          } else if (memo && curr.duration == memo.duration){
            memo.name.push(curr.name);
          }
          return memo;
        };
        var res = _.reduce(arr,reductFuncGetLogestCalles, {
          duration: null,
          name: []
        });
        return res.name;
    }

};

var SECOND = 1000;
var MIN = 60 * SECOND;

var callLogger = new CallLogger();
callLogger.recordIncomingCall("Fred", 2 * MIN);
callLogger.recordIncomingCall("Greg", 3 * MIN);
callLogger.recordIncomingCall("Emily", 45 * MIN);
callLogger.recordOutgoingCall("Mike", 310 * MIN);
callLogger.recordOutgoingCall("Tom", 310 * MIN);
callLogger.recordOutgoingCall("John", 1 * MIN);
console.log(_.isEqual(callLogger.getLongestCalledUsingReduce(), ['Mike', 'Tom']));
console.log(_.isEqual(callLogger.getLongestCalled(), ['Mike', 'Tom']));
