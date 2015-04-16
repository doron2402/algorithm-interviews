/*
  What will be the output ???
*/
function foo(x) {
  var tmp = 3;

  function bar(y) {
    alert(x + y + (++tmp));
    alert(x + y + (tmp++));
  }

  bar(10);
}

foo(2);

