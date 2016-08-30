function runFunctionOnce(cb) {
    return function () {
        if (cb === null) return;
        var finalCallback = cb;
        cb = null;
        finalCallback.apply(this, arguments);
    };
}

function runFunctonOnceAndFail(cb) {
    return function() {
        if (cb === null) throw new Error("Callback was already called.");
        var finalCallback = cb;
        cb = null;
        finalCallback.apply(this, arguments);
    };
}


function iterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    }
}

var fn = function (num, index, cb) {
  setTimeout(function () {
    num += 2;
    cb(null,num);
  }, num * 1000);
};
var arr = [1, 2, 3, 4,5,6,7,8,9];
var finalCB = function (err, result) {
  if (err) {
    console.log('err');
    console.log(err);
    return err;
  }
  console.log('result');
  console.log(result);
  return result;
};


var runTasks = function (tasks, options, fn, callback) {

  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    throw new TypeError("tasks is not a valid array");
  }

  if (typeof options !== 'object') {
    throw new TypeError("Options should be an object");
  }
  if (typeof fn !== 'function') {
    throw new TypeError("fn is not defined");
  }

  if (typeof callback !== 'function') {
    throw new TypeError("Callback is not defined");
  }

  const limit = options.limit;
  if (limit <= 0) {
    return callback(null);
  }


  callback = runFunctionOnce(callback || undefined);
    if (limit <= 0 || !tasks) {
        return callback(null);
    }
    var nextTask = iterator(tasks);
    var done = false;
    var running = 0;

    function iterateeCallback(err) {
        running -= 1;
        if (err) {
            done = true;
            callback(err);
        }
        else if (done && running <= 0) {
            return callback(null);
        }
        else {
            retry();
        }
    }

    function retry () {
      while (running < limit && !done) {
          var elem = nextTask();
          if (elem === null) {
              done = true;
              if (running <= 0) {
                  callback(null);
              }
              return;
          }
          running += 1;
          fn(elem.value, elem.key, runFunctonOnceAndFail(iterateeCallback));
      }
    }
    retry();
};

runTasks(arr, { limit: 2 }, fn, finalCB);