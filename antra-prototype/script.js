//Helper Functions and Variations
const doublerFunc = (val) => {
  return val * 2;
};
const addFunc = (val1, val2) => {
  //console.log(val1, val2)
  return val1 + val2;
};
const a = [0, 1, 2, 3];
const b = [1, 2, 3, 4];
// myMap is a custom function that replicates map
Array.prototype.myMap = function (func, args) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(func.apply(args, [this[i], i, this]));
  }
  return res;
};
console.log(
  a.map((val) => val * 2),
  a.myMap((val) => val * 2)
);
console.log(
  a.map((val, index) => val * index),
  a.myMap((val, index) => val * index)
);
console.log(
  a.map((val, index, arr) => val * arr[index]),
  a.myMap((val, index, arr) => val * arr[index])
);
console.log(a.map(doublerFunc), a.myMap(doublerFunc));
/*
console.log(b.myMap( val => val * 2))
console.log(b.myMap( (val, index) => val * index))
console.log(b.myMap( (val, index, arr) => val * arr[index]))
console.log(b.myMap(doublerFunc))
*/
//The reduce() method executes a reducer function for array element.
//The reduce() method returns a single value: the function's accumulated result.
//The reduce() method does not execute the function for empty array elements.
//The reduce() method does not change the original array.
// myReduce is a custom function that replicates reduce
Array.prototype.myReduce = function (func, res) {
  let i = 0;
  if (this.length === 0)
    throw new TypeError("Reduce of empty array with no initial value");
  //The arguments.length property contains the number of arguments passed to the function.
  if (arguments.length < 2) {
    i = 1;
    res = this[0];
  }
  for (; i < this.length; i++) {
    res = func(res, this[i], i, this);
  }
  return res;
};
console.log(a.reduce(addFunc), a.myReduce(addFunc));
console.log(a.reduce(addFunc, 1), a.myReduce(addFunc, 1));
//console.log([].reduce(addFunc), [].myReduce(addFunc))
