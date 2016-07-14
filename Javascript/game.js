/*
  row of n coins of values v1 . . . vn
*/
var assert=require('assert');

var maxPointsRec = function(coins, i, j) {
    if (i === undefined || j === undefined) return maxPointsRec(coins, 0, coins.length - 1);
    if (j === i) return coins[i];
    if (j === i + 1) return Math.max(coins[i], coins[j]);

    var coin_l = coins[i] + Math.min(maxPointsRec(coins, i + 2, j), maxPointsRec(coins, i + 1, j - 1));
    var coin_r = coins[j] + Math.min(maxPointsRec(coins, i + 1, j - 1), maxPointsRec(coins, i, j - 2));

    return Math.max(coin_l, coin_r);
};

var maxPointsDp = function(coins) {
	var cache = [];
	for(var i=0; i<coins.length; i++) {
		cache[i] = [];
		cache[i][i] = coins[i];
		if (i > 0) cache[i-1][i] = Math.max(coins[i-1], coins[i]);
	}

	var coin_l, coin_r;
	for (i=0; i<coins.length; i++) {
		for (var j=i+2; j<coins.length; j++) {
			coin_l = coins[i] + Math.min(cache[i+2][j], cache[i+1][j-1]);
			coin_r = coins[j] + Math.min(cache[i+1][j-1], cache[i][j-2]);
			cache[i][j] = Math.max(coin_l, coin_r);
		}
	}
	return cache[0][coins.length-1];

};

var input_1 = [5, 3, 7, 10];
var output_1 = 15;

var input_2 = [8, 15, 3, 7];
var output_2 = 22;

var run = function() {
    assert.strictEqual(maxPointsRec(input_1), output_1);
    assert.strictEqual(maxPointsRec(input_2), output_2);
    assert.strictEqual(maxPointsDp(input_1), output_1);
    assert.strictEqual(maxPointsDp(input_2), output_2);
};

run();