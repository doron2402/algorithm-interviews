var tasks = [
  function task1(val) {
    if (!val) {
      val = arguments[0];
    }
    setTimeout(function () {
      console.log('task1');
    }, 1000 * val);
  },
  function task1(val) {
    if (!val) {
      val = arguments[0];
    }
    setTimeout(function () {
      console.log('task1');
    }, 1000 * val);
  },
  function task1(val) {
    if (!val) {
      val = arguments[0];
    }
    setTimeout(function () {
      console.log('task1');
    }, 1000 * val);
  },
  function task1(val) {
    if (!val) {
      val = arguments[0];
    }
    setTimeout(function () {
      console.log('task1');
    }, 1000 * val);
  }
];

var runTasks = function (tasks, callback) {
  forEach(tasks, function (task, index) {
    if (typeof task !== 'object') {
      task = { fn: task, isComplete: false}
    }
  });
}