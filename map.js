/*
 *
 * Create map function in javascript
 *
 */

var arr = [1,2,3];

function map(arr, fn) {
  var tmp = [];
  arr.forEach(function(item, index){
    tmp[index] = fn(item);
  });
  return tmp;
}

function addTwo(a) {
  return a+2;
}

//Test
var test = map(arr, addTwo);
console.log(test);
// result: [ 3, 4, 5 ]
