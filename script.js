/*
let res = null + "5";
console.log(res);

let res2 = null + 5;
console.log(res2);

res = 12 / "2";
console.log(res);

res = +"123";
console.log(res);

res = +false;
console.log(res);

res = +"abc";
console.log(res);

res = true + false;
console.log(res);
const a = { name: "Eric" };
const b = { name: "Eric" };
console.log(a);
console.log(a == b);
console.log(a === b);

for (let key in a) {
  console.log(key);
  console.log(a.key);
  console.log(a.name);
  console.log(a[key]);
}

if (1 - "1") console.log("Here");
else console.log("Not Here");

function foo() {
  if (true) {
    var a = 3;
  }

  console.log(a);
}

foo();
console.log(a);
*/
/*
let [, y] = [1, 2, 3];
console.log(x, y, z);

let [...x, , z] = [1,2,3,4]
*/

let obj = { x: 1, y: 2 };
//let { a, b } = obj;
//let { x, y } = obj;

//let { a, ...x } = { a: 1, b: 2, c: 3 };

let { a: x, b: y } = { a: 2, b: 3 };
//console.log("a = ", a);
//console.log("b = ", b);
console.log("x = ", x);
console.log("y = ", y);

const obj2 = { name: "JR", id: 1 };
//const obj1 = { ...obj2 };
//obj1.name = "Moe";

console.log(obj2.name);
const { name } = obj2;
const obj1 = { age: 30, ...name };
console.log(obj1);

function Person() {
  this.name = "Jack";
  this.age = 25;

  this.sayName = function () {
    console.log(this.age);

    const inner = function () {
      console.log(this);
      console.log("INNER");
    };
    inner();
  };
}

let person = new Person();

console.log(typeof person.sayName);
console.log(person.sayName());

const controller = (function (a) {
  return {
    init: () => {
      console.log("init: " + a);
    },
  };
})(5);

console.log(controller);
