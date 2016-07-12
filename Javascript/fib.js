// Fib

// For Loop
var fib = function(num) {
  var fibSum = [0,1];
  if (fibSum[num]){
    return fibSum;
  }

  for(var i=2;i <= num;i++) {
    fibSum[i] = fibSum[i-1] + fibSum[i-2];
  }
  console.log(fibSum);
  return fibSum[num];
}

// recursive solution
var fib = function(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(n-1)+fib(n-2);
}