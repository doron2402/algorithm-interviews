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
  const MaxConcurrentTasks = !isNaN(options.maxConcurrentTasks) ? options.maxConcurrentTasks : 10;
  const MaxNumberOfRetry = options.maxNumberOfRetry || 3;
  const results = new Array(tasks.length);
  let counter = 0;
  let isComplete = false;
  let isRetryMode = false;
  let runningTask = 0;

  // When max concurrent task we should return;
  if (MaxConcurrentTasks <= 0) {
    return callback(null, []);
  }

  tasks.forEach(function (task, index) {
    // if (!isComplete) {
      task(function (err, result) {
        runningTask++;
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
              runningTask--
              results[index] = result;
              if (counter === tasks.length && !isRetryMode) {
                isComplete = true;
                callback(null, results);
              }
            });
          }
        } else {
          runningTask--
          results[index] = result;
        }

        if (counter === tasks.length && !isRetryMode) {
          isComplete = true;
          callback(null, results);
        }
      }); // end iterator
    // } // is Complete

  }, this); // end foreach

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
