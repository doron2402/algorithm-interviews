var Obj = {
  arr: [1,2,3],
  name: {first: 'first', last: 'last'}
};

var stringify = function(item) {
 console.log(item);
 if (Array.isArray(item)){
  console.log('array');
  item.forEach(function(item2){
    stringify(item2);
  });
 } else if(typeof item === 'object') {
  console.log('object');
  Object.keys(item).forEach(function(item2){
    stringify(item[item2]);
  });
 } else {
  console.log(typeof item);
 }

};

stringify(Obj);

