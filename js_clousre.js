/*
  What will be the output ???
*/
function foo(x) {
  var tmp = 3;

  function bar(y) {
    console.log(x + y + (++tmp)); //16
    console.log(x + y + (tmp++)); //16
  }

  bar(10);
}

foo(2);

