// #https://en.wikipedia.org/wiki/Newton%27s_method

var sqrRoot = function(x) {
  if (x < 0) {
    return;
  }
  var accuracy = 0.0001;
  var round = 3;
  var a = 1;
  var b = x;
  while (Math.abs(b-a) > accuracy) {
    b = (a+b)/2;
    a = x/b;
    console.log(a + ' / ' + b);
  }
  return b.toFixed(4);
}

// p sqr_root 0.4 #0.632
// p sqr_root 100 #10
// p sqr_root 12 #3.464
sqrRoot(12)