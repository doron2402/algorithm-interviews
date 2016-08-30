var garden = [
    [5, 7, 8, 6, 3],
    [0, 0, 7, 0, 4],
    [4, 6, 3, 4, 9],
    [3, 1, 0, 5, 8]
 ];

 var path = []; // The path will use for history or audit if needed.

 // Returns Void
 // @params matrix
 // @params coordinates {x,y}
 var eat = function (matrix, coordinates) {
   path.push({
     x: coordinates.x,
     y: coordinates.y,
     val: matrix[coordinates.x][coordinates.y]
   });
  matrix[coordinates.x][coordinates.y] = 0; // Set location to zero - the rabbit ate all the carrots
 }

 var findNextCarrot = function (garden, coordinates) {
   var result = findMaxCarrotAroundMe(garden, coordinates);
   if (!result || !garden[result.x] || !garden[result.x][result.y] ||
     parseInt(garden[result.x][result.y]) === 0
     ) {
      return false;
   }
   return result;
 }

 // Returns coordinate {x,y}
 var findMaxCarrotAroundMe = function(garden, coordinates) {
    var up = 0;
    var down = 0;
    var left = 0;
    var right = 0;
    var maxCoordinates = {};
    // var x = coordinates.x; //TODO: es6 destruct
    // var y = coordinates.y;//TODO: es6 destruct
    // up
    if (garden[coordinates.x-1] && garden[coordinates.x-1][coordinates.y]) {
        up = garden[coordinates.x-1][coordinates.y];
        maxCoordinates[up] = {x: coordinates.x-1, y: coordinates.y};
    }
    // down
    if (garden[coordinates.x+1] && garden[coordinates.x+1][coordinates.y]) {
        down = garden[coordinates.x+1][coordinates.y];
        maxCoordinates[down] = {x: coordinates.x+1, y: coordinates.y};
    }
    //left
    if (garden[coordinates.x] && garden[coordinates.x][coordinates.y-1]) {
        left = garden[coordinates.x][coordinates.y-1];
        maxCoordinates[left] = {x: coordinates.x, y: coordinates.y-1};
    }
    //right
    if (garden[coordinates.x] && garden[coordinates.x][coordinates.y+1]) {
        right = garden[coordinates.x][coordinates.y+1];
        maxCoordinates[right] = {
          x: coordinates.x,
          y: coordinates.y+1
        };
    }
    return maxCoordinates[Math.max(up, down, right, left)];
 };


 // return the number of the carrots in the cetner
 var run = function (matrix) {

   var middleMaxCoordinate = getMiddleItem(matrix);
    // eat first carrot
    eat(garden, middleMaxCoordinate);
    var currentLocation = middleMaxCoordinate;
    while(currentLocation !== false) {
      currentLocation = findNextCarrot(garden, currentLocation);
      if (currentLocation) {
        eat(garden, currentLocation);
      }
    }

    console.log(path);
    console.log(calculatePath(path));
 }

const calculatePath = function (path) {
  return path.reduce(sumPath, 0);
  function sumPath(a, b) {
    return a + parseInt(b.val);
  };
}

  // Returns Collection of coordinates
  // @param matrix (garden [[]])
 var getMiddleRows = function(matrix) {
     var middleRows = [];
     if (matrix.length % 2 === 0) {
        middleRows.push({ x: matrix.length/2 });
        middleRows.push({ x: (matrix.length/2)-1 });
    } else {
        middleRows.push({ x: matrix.length/2 });
    }
    return middleRows;
 }

// Returns Middle/Max coordinates
// @param matrix (garden [[]])
 var getMiddleItem = function (matrix) {
   var middleRows = getMiddleRows(matrix);
    if (middleRows.length === 1) {
        return getMaxCoordinates(middleRows[0].x, matrix);
    }
    else {
      let a = getMaxCoordinates(middleRows[0].x, matrix);
      let b = getMaxCoordinates(middleRows[1].x, matrix);
      if (matrix[a.x][a.y] > matrix[b.x][b.y]) {
        return a;
      }
      return b;
    }
 }

 // Returns Object - coordinates {x,y}
 // @param x - number represet the middle rows
 // @param matrix (garden [[]])
 var getMaxCoordinates = function (x, matrix) {
    let length = matrix[x].length;
    let coordinate = { x: x, y: Math.floor(length/2) };
    if (length % 2 === 0) {
      coordinate = matrix[x][length/2] > matrix[x][(length/2)-1] ?
        { x: x, y: length/2 } :
        { x: x, y: (length/2)-1 };
    }
    return coordinate;
 };

 // Start here
 run(garden);
