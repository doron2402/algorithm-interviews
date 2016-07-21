var each = function(arr, fn, callback){
  if (!Array.isArray(arr)) {
    throw new TypeError("first param should be an array");
  }
  if (typeof fn !== 'function') {
    throw new TypeError("second argument should be a function");
  }
  if (typeof callback !== 'function') {
    callback = Function.prototype;
  }
  var count = 0;
  var isComplete = false;
  var results = [];
  arr.forEach(function(item){

    fn(item, function(err, result){
      if (err) {
        return callback(err);
      }
      count++;
      results.push(result);
      if (count === arr.length) {
        isComplete = true;
      }
      if (isComplete) {
        callback(null, results);
      }
    });
  });
};

var arr = [1, 2, 3, 4, 5, 6];
var fn = function (item, cb) {
  setTimeout(function(){
    cb(null, item);
  }, 500 * item);
};
each(arr, fn, function(err, result){
  if (err){
    console.log('error');
    console.log(err);
  }
  console.log('result');
  console.log(result);
});
