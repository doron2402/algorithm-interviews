var optimalStrategyOfGame = function(arr) {
    // Create a table to store solutions of subproblems
		var table = [[]];

    // Fill table using above recursive formula. Note that the table
    // is filled in diagonal fashion (similar to http://goo.gl/PQqoS),
    // from diagonal elements to table[0][n-1] which is the result.

    // init table
    for(var i=0;i<arr.length; i++) {
      table[i] = [];
      for(var j=0; j<arr.length; j++) {
        table[i][j] = null;
      }
    }


    for (var gap = 0; gap < arr.length; gap++) {
      var j = gap;
      var i = 0;
      for (i = 0; j < arr.length; i++, j++) {
          // Here x is value of F(i+2, j), y is F(i+1, j-1) and
          // z is F(i, j-2) in above recursive formula
          var x = ((i+2) <= j) ? table[i+2][j] : 0;
          var y = ((i+1) <= (j-1)) ? table[i+1][j-1] : 0;
          var z = (i <= (j-2))? table[i][j-2]: 0;
          console.log(x)
          console.log(y)
          console.log(z)
          table[i][j] = Math.max(
            arr[i] + Math.min(x, y),
            arr[j] + Math.min(y, z)
          );
          console.log(table);
      }
    }

    return table[0][arr.length-1];
}

// Driver program to test above function
var init = function()
{
    var arr1 = [8, 15, 3, 7];
    var ans = optimalStrategyOfGame(arr1);
    console.log(ans);
}
init();
