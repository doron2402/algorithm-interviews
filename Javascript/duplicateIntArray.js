// Find duplicate number in array
// Time Complexity: O(n)
// Auxiliary Space: O(1)
//
var findDuplicates = function(arr)
{
  var i = 0;

  for (i = 0; i < arr.length-1; i++) {
    while (arr[arr[i]] != arr[i]) {
      var tmp = arr[i];
      arr[i] = arr[tmp];
      arr[tmp] = tmp;
    }
  }

  for (i = 0; i < arr.length-1; i++) {
    if (arr[i] != i) {
      console.log("Number: " + arr[i]);
    }
  }

}

var run = function() {
  var arr = [1,2,3,1,3,0,6];
  findDuplicates(arr);

}
run();

