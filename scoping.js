/*
 *  passing this to a function
 */

/*
 * Question
 *
 * Without changing sayHi how can we print
 * Hi Johnny
 * Hint: Passing scope
 *
 */
funtion sayHi() {
  console.log('Hi ' + this.name);
}


/*
 *
 * Solution
 *
 */
sayHi.call({name: 'Johnny'});
sayHi.bind({name: 'Johnny'})();
sayHi.apply({name: 'Johnny'});
