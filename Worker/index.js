const worker = function(tasks, options, callback) {

  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    throw new TypeError("tasks is not a valid array");
  }

  if (typeof options === 'function') {
    callback = options;
  }

  if (typeof callback !== 'function') {
    throw new TypeError("Callback is not defined");
    // callback = Function.prototype;
  }

  const MaxConcurrentTasks = 10 || options.maxConcurrentTasks;
  const MaxNumberOfRetry = 3 || options.maxNumberOfRetry;
  const results = new Array(tasks.length);
  let counter = 0;
  let isComplete = false;
  let isRetryMode = false;

  tasks.forEach(function (task, index) {
    if (!isComplete) {
      task(function (err, result) {
        counter++;
        if (err) {
          let numberOfRetry = 1;
          if (numberOfRetry >= MaxNumberOfRetry) {
            isComplete = true;
            return callback(err);
          } else {
            isRetryMode = true;
            retry(MaxNumberOfRetry - numberOfRetry, task, function (err, result) {
              if (err) {
                return callback(err);
              }
              isRetryMode = false;
              results[index] = result;
              if (counter === tasks.length && !isRetryMode) {
                isComplete = true;
                callback(null, results);
              }
            });
          }
        } else {
          results[index] = result;
        }

        if (counter === tasks.length && !isRetryMode) {
          isComplete = true;
          callback(null, results);
        }
      });
    }

  }, this);

};

const retry = function (num, fn, done) {

  if (num === 0) {
    return done('Repeat fail');
  }

  fn(function (err, result) {
    if (err) {
      return retry(num - 1, fn, done);
    }
    return done(err, result);
  });
}

module.exports = worker;
