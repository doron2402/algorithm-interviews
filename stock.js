/*
  I have an array stockPricesYesterday where:

  The indices are the time, as a number of minutes past trade opening time, which was 9:30am local time.
  The values are the price of Apple stock at that time, in dollars.
  For example, the stock cost $500 at 10:30am, so stock_prices_yesterday[60] = 500.

  Write an efficient algorithm for computing the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday. For this problem, we won't allow "shorting"—you must buy before you sell.

  Complexity: O(n) time (we're only looping through the array once) and O(1) space.
*/

function findBestProfit(stockPricesYesterday) {
  var min_price = stockPricesYesterday[0];
  var max_profit = 0;
  stockPricesYesterday.forEach(function(current_price) {
    min_price = Math.min(min_price, current_price);
    max_profit = Math.max(max_profit, current_price - min_price);
  });
  return max_profit
};