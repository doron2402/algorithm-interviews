var arr = [1,2,3,[4,5,6],3];

var sumArray= function(arr) {
  var sum = 0;
  arr.forEach(function(item){
    if (Array.isArray(item)){
      sum += sumArray(item);
    } else if(typeof item == 'number') {
      sum += item;
    }
  });
  return sum;
};

var res = sumArray(arr);
console.log(res);
console.log(sumArray([2, 5, [4, 6], 5]));
