var BST = {};
var sortArrayToBST = function(arr){
  //array is already sorted so we can assume that root is the middle
  var middleIndex = Math.ceil((arr.length-1)/2);
  BST.root = {
    value: arr[middleIndex],
    left: getNextNode(arr, 0, middleIndex-1),
    right: getNextNode(arr, middleIndex+1, arr.length-1)
  };
  console.log('Done.');
};

getNextNode = function(arr, start, end){
  if (start > end){
    return;
  }
  var middleIndex = Math.ceil((start+end)/2);
  return {
    value: arr[middleIndex],
    left: getNextNode(arr, start, middleIndex-1),
    right: getNextNode(arr, middleIndex+1, end)
  };
};

sortArrayToBST([1,2,3,4,5,6,7,8,9,10,11]);
console.log(JSON.stringify(BST));

//Java
/*
public class TreeNode {
 int val;
 TreeNode left;
 TreeNode right;
 TreeNode(int x){
  val = x;
 }
}

public class Solution {
  public TreeNode sortedArrayToBST(int[] num){
    if (num.length == 0){
      return null;
    }
    return sortedArrayToBST(num, 0, num.length-1);
  }

  public TreeNode sortedArrayToBST(int[] num, int start, int end){
    if (start > end){
      return null;
    }

    int mid = (start+end)/2;
    TreeNode root = new TreeNode(num[mid]);
    root.left = sortedArrayToBST(num, start, mid-1);
    root.right = sortedArrayToBST(num, mid+1, end);

    return root;
  }
}
*/
