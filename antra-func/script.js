const chanceFunc = (function () {
  let counter = 0;
  let chanceMessage = [
    "Congrats you earn the chance!",
    "Sorry you missed the chance",
  ];
  return function () {
    let message = counter < 5 ? chanceMessage[0] : chanceMessage[1];
    counter += 1;
    console.log(message);
  };
})();
chanceFunc();
chanceFunc();
chanceFunc();
chanceFunc();
chanceFunc();
chanceFunc();
chanceFunc();
chanceFunc();

let arr = ["Hi", "Hello", "Hey"];
let minimumLength = 2;

const longerThan = (arr) => (minLength) =>
  arr.filter((val) => val.length > minLength);
console.log(longerThan(arr)(1));
console.log(longerThan(arr)(2));
console.log(longerThan(arr)(3));
