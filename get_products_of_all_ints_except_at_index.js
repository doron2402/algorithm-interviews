/*

  You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

  Write a function that takes an array of integers and returns an array of the products.

  For ex: [1,7,3,4] => [84, 12, 28, 21]
*/

function returnNewProductArray(arr) {
  var products_of_all_ints_except_at_index = []; //same as arr.length
  var product = 1;
  var i = 0;

  while (i < arr.length){
    products_of_all_ints_except_at_index[i] = product;
    console.log(products_of_all_ints_except_at_index);
    product *= arr[i];
    i += 1;
  }

  product = 1
  i = i - 1;

  while (i >= 0) {
    products_of_all_ints_except_at_index[i] *= product;
    console.log(products_of_all_ints_except_at_index);
    product *= arr[i];
    i -= 1;
  }

  return products_of_all_ints_except_at_index;

};
