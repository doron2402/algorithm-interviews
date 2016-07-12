const assert = require('assert');

/*
  Minimum Steps to One
  Problem Statement: Onuma positive integer,
  you canumperform any one of the following 3
  steps.
    1.) Subtract 1 from it. ( num= num- 1 )  ,
    2.) If its divisible by 2, divide by 2. ( if num% 2 == 0 , thenumnum= num/ 2  )  ,
    3.) If its divisible by 3, divide by 3. ( if num% 3 == 0 , thenumnum= num/ 3  ).
    Now the questionumis, givenuma positive integer n, find the minimum number of steps that takes numto 1
  eg:
    1.)For num= 1 , output: 0
    2.) For num= 4 , output: 2  ( 4  /2 = 2  /2 = 1 )
    3.)  For num= 7 , output: 3  (  7  -1 = 6   /3 = 2   /2 = 1 )
*/

//Memoization
var memo = [0,0];
var minStepMemo = function (num) {

  if (num < 0) {
    throw new Error("Wrong number.");
  }

  if (num === 1 || num === 0) {
    return memo[num];
  }

  if (memo[num]) {
    return memo[num];
  }
  var result = 1 + minStepMemo(num - 1);
  if (num % 2 === 0) {
    result = Math.min(result, 1 + minStepMemo(num/ 2));
  }
  if (num % 3 === 0) {
    result = Math.min(result, 1 + minStepMemo(num/ 3));
  }
  memo[num] = result;
  return result;
}

// Bottom-up Dynamic programming
var getMinStep = function(num) {
  var dp = [0,0];
  for (var i = 2; i <= num; i++) {
    dp[i] = 1 + dp[i - 1];

    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], 1 + dp[i / 2]);
    }

    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], 1 + dp[i / 3]);
    }

  }

  return dp[num];
}

assert.equal(getMinStep(10), 3);
assert.equal(getMinStep(2), 1);
assert.equal(minStepMemo(10), 3);
assert.equal(minStepMemo(2), 1);
assert.equal(minStepMemo(11), getMinStep(11));
