// 1. Write a JavaScript function that reverse a number.
// Example x = 32243;
// Expected Output: 34223
const reverseNumber = (num) => {
  return parseInt(num.toString().split("").reverse().join("")) * Math.sign(num);
};

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not?
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g.,
// madam or nurses run.
const isPalindrome = (str) => {
  let regex = /[\W_]/g;
  let newStr = str.toLowerCase().replace(regex, "");

  /*
  let left;
  let right;
  let mid = parseInt(newStr.length / 2);

  if (newStr.length % 2) {
    left = mid;
    right = mid;
  } else {
    left = mid - 1;
    right = mid;
  }

  while (left >= 0 && right < newStr.length) {
    if (newStr[left] !== newStr[right]) return false;
    left--;
    right++;
  }
  return true;
  */

  return newStr.split("").reverse().join("") === newStr;
};
// 3. Write a JavaScript function that generates all combinations of a string.
// Example string: 'dog'
// Expected Output: d, do, dog, o, og, g
const subsetStrings = (str) => {
  let subStrings = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      subStrings.push(str.slice(i, j));
    }
  }
  return subStrings;
};

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order.
// Example string: 'webmaster'
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
const alphabeticalOrder = (str) => {
  return str.split("").sort();
};

// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of
// each word of the string in upper case.
// Example string: 'the quick brown fox'
// Expected Output: 'The Quick Brown Fox '
const toUpperFirstLetter = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(
      (substring) => substring.charAt(0).toUpperCase() + substring.substring(1)
    )
    .join(" ");
};
// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word
// within the string.
// Example string: 'Web Development Tutorial'
// Expected Output: 'Development'
const findLongestWord = (str) => {
  /*
  let strs = str.split(" ");
  let longestString = strs[0];
  for (let word of strs) {
    if (word.length > longestString.length) longestString = word;
  }
  return longestString
  */

  let longestString = str.split(" ").reduce((currentWord, longestWord) => {
    return currentWord.length > longestWord.length ? currentWord : longestWord;
  });

  return longestString;
};
console.log(findLongestWord("Web Development Tutorial"));
// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of
// vowels within the string.
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as
// vowel here.
// Example string: 'The quick brown fox'
// Expected Output: 5
const countVowels = (str) => {
  /*
  let totalVowels = 0;
  let vowels = ["a", "e", "i", "o", "u"];
  let newStr = str.toLowerCase().split("");
  for (let char of newStr) {
    if (vowels.includes(char)) totalVowels++;
  }
  return totalVowels;
  */

  let countVowels = str.match(/[aeiou]/gi);
  return countVowels === null ? 0 : countVowels.length;
};
console.log(countVowels("The quick brown fox"));
// 8. Write a JavaScript function that accepts a number as a parameter and check the number is
// prime or not.
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive
// divisors other than 1 and itself.
const isPrime = (num) => {
  for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
    if (num % i == 0) return false;
  }

  return true;
};
console.log(isPrime(10));
// 9. Write a JavaScript function which accepts an argument and returns the type.
// Note: There are six possible values that typeof returns: object, boolean, function, number, string,
// and undefined.
const returnType = (arg) => {
  return typeof arg;
};

console.log(returnType(3));
console.log(returnType(""));
console.log(returnType("yes"));
console.log(returnType(() => {}));
console.log(returnType());
console.log(returnType({}));
console.log(returnType(undefined));
console.log(returnType(false));

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix.
const printIdentityMatrix = (n) => {
  let matrix = Array.from(Array(n), () => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      i === j ? (matrix[i][j] = 1) : (matrix[i][j] = 0);
    }
  }
  console.log(matrix);
};
printIdentityMatrix(3);
// 11. Write a JavaScript function which will take an array of numbers stored and find the second
// lowest and second greatest numbers, respectively.
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4
const findKNum = (arr) => {
  let arrCopy = [...arr];
  let res = [];
  //Brute Force
  const minVal = Math.min(...arrCopy);
  const minValIndex = arrCopy.indexOf(minVal);
  res.push(arrCopy.splice(minValIndex, 1)[0]);
  let maxVal = Math.max(...arrCopy);
  let maxValIndex = arrCopy.indexOf(maxVal);
  arrCopy.splice(maxValIndex, 1);
  maxVal = Math.max(...arrCopy);
  maxValIndex = arrCopy.indexOf(maxVal);
  res.push(arrCopy.splice(maxValIndex, 1)[0]);
  //Sort Method

  return res;
};
console.log(findKNum([1, 2, 3, 4, 5]));
// 12. Write a JavaScript function which says whether a number is perfect.
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to
// the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the
// number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is
// half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1
// + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 +
// 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the
// perfect numbers 496 and 8128.

const isPerfectNumber = (num) => {
  let sum = 0;

  for (let i = 0; i < num; i++) {
    if (num % i == 0) sum += i;
  }

  if (sum == num) return true;
  return false;
};

console.log(isPerfectNumber(496));
console.log(isPerfectNumber(8128));
console.log(isPerfectNumber(9));
console.log(isPerfectNumber(6));
// 13. Write a JavaScript function to compute the factors of a positive integer.
const findFactors = (num) => {
  let res = [];
  for (let i = 0; i <= num; i++) {
    if (num % i === 0) {
      res.push(i);
    }
  }

  return res;
};

console.log(findFactors(12));
// 14. Write a JavaScript function to convert an amount to coins.
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins.
// Output: 25, 10, 10, 1

const convertToCoins = (amountToCoins, coinArr) => {
  let res = [];
  while (amountToCoins > 0) {
    coinArr.forEach((coin) => {
      let divisible = amountToCoins / coin;
      while (divisible >= 1) {
        //console.log(amountToCoins, res);
        amountToCoins -= coin;
        res.push(coin);
        divisible = amountToCoins / coin;
      }
    });
  }

  return res;
};

console.log(convertToCoins(46, [25, 10, 5, 2, 1]));
// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the
// bases. Accept b and n from the user and display the result.
const exponentFunc = (base, exponent) => {
  let res = 1;
  let negative = false;
  if (exponent < 0) {
    negative = true;
    exponent *= -1;
  }
  for (let i = 0; i < exponent; i++) {
    negative ? (res /= base) : (res *= base);
  }
  return res;
  //return Math.pow(base, exponent);
};

console.log(exponentFunc(7, 3), Math.pow(7, 3));
console.log(exponentFunc(7, -2), Math.pow(7, -2));
console.log(exponentFunc(7, 0.5), Math.pow(7, 0.5));
// 16. Write a JavaScript function to extract unique characters from a string.
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"

const uniqueChars = (str) => {
  let newStr = str.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
  let hashMap = {};
  let res = "";
  [...newStr].forEach((char) => {
    if (!hashMap[char]) {
      res += char;
      hashMap[char] = 1;
    }
  });
  return res;
};
let uniqueChar = uniqueChars("thequickbrownfoxjumpsoverthelazydog");
console.log(uniqueChar, uniqueChar === "thequickbrownfxjmpsvlazydg");
// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string.
const occurencesOfChars = (str) => {
  let newStr = str.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
  console.log(newStr);
  let hashMap = {};
  for (const char of newStr) {
    if (!hashMap[char]) hashMap[char] = 1;
    else hashMap[char] += 1;
  }
  return Object.entries(hashMap);
};
console.log(occurencesOfChars("AAABBbbCCcc"));
// 18. Write a function for searching JavaScript arrays with a binary search.
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds
// the desired value.
const binarySearch = (arr, searchVal) => {
  //assumes array is sorted
  let [left, right] = [0, arr.length - 1];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    //middle is greater than search, value is on the left
    if (arr[mid] === searchVal) return mid;
    else if (arr[mid] > searchVal) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
};
let binaryArray = [1, 3, 5, 7, 8, 9];
console.log(binarySearch(binaryArray, 5));
console.log(binarySearch(binaryArray, 10));
console.log(binarySearch(binaryArray, 8));
// 19. Write a JavaScript function that returns array elements larger than a number.
const largerElements = (arr, val) => {
  /*
  //Brute Force
  let res = [];

  //for of is for ARRAYS
  //for in is for OBJECTS
  for (const ele of arr) {
    if (ele > val) res.push(ele);
  }

  return res;
  */

  return arr.filter((arrVal) => arrVal > val);
};

console.log(largerElements(binaryArray, 2));
// 20. Write a JavaScript function that generates a string id (specified length) of random characters.
// Sample   character   list:
// "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const generateStringId = (strLength) => {
  let charList =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < strLength; i++) {
    let randomIndex = parseInt(Math.random() * charList.length);
    res += charList[randomIndex];
  }

  return res;
};
console.log(generateStringId(5));
console.log(generateStringId(5));
// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2)
// combinations in an array.
// Sample array: [1, 2, 3] and subset length is 2
// Expected output: [[2, 1], [3, 1], [3, 2]]
const fixedLengthSubsets = (arr, subsetLength) => {
  //DP
  //Brute Force
  let res = [];

  const backtrack = (arr, subsetLength, currLength, subset, index) => {
    if (currLength === subsetLength) {
      res.push([...subset]);
      return;
    }

    if (index >= arr.length) return;

    subset[currLength] = arr[index];
    backtrack(arr, subsetLength, currLength + 1, subset, index + 1);
    backtrack(arr, subsetLength, currLength, subset, index + 1);
  };

  backtrack(arr, subsetLength, 0, [], 0);
  return res;
};

console.log(fixedLengthSubsets([1, 2, 3], 2));
// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function
// will count the number of occurrences of the specified letter within the string.
// Sample arguments: 'microsoft.com', 'o'
// Expected output: 3

const findOccurencesOfLetter = (str, char) => {
  let newStr = str.toLowerCase();
  let newChar = char.toLowerCase();
  let filteredStr = [...newStr].filter((char) => {
    return char === newChar;
  });
  return filteredStr.length;
};

console.log(findOccurencesOfLetter("microsoft.com", "o"));
// 23. Write a JavaScript function to find the first not repeated character.
// Sample arguments: 'abacddbec'
// Expected output: 'e'

const nonRepeatChar = (str) => {
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (str.indexOf(char) === str.lastIndexOf(char)) return char;
  }
  return null;
};

console.log(nonRepeatChar("abacddbec"));
console.log(nonRepeatChar("abacddbecf"));
// 24. Write a JavaScript function to apply Bubble Sort algorithm.
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple
// sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing
// each pair of adjacent items and swapping them if they are in the wrong order".
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
// 25. Write a JavaScript function that accept a list of country names as input and returns the
// longest country name as output.
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
// 26. Write a JavaScript function to find longest substring in a given a string without repeating
// characters.
// 27. Write a JavaScript function that returns the longest palindrome in a given string.
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest
// symmetric factor problem is the problem of finding a maximum-length contiguous substring of a
// given string that is also a palindrome. For example, the longest palindromic substring of
// "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for
// example, in the string "abracadabra", there is no palindromic substring with length greater than
// three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all
// substrings that are themselves palindromes and cannot be extended to larger palindromic
// substrings) rather than returning only one substring or returning the maximum length of a
// palindromic substring.
// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter.
// 29. Write a JavaScript function to get the function name.

const tester = () => {
  const nums = [0, 1, -1, 12, -12, 120];

  const smallWords = ["dog", "doggo", "madam", "race car"];

  const largeWords = [
    "webmaster",
    "the quick brown fox",
    "Web Development Tutorial",
  ];
  /*
  for (let num of nums)
    console.log(`reverseNumber: ${num}, ${reverseNumber(num)}`);

  for (let str of smallWords)
    console.log(`Palindrome: ${str}, ${isPalindrome(str)}`);

  for (let str of smallWords)
    console.log(`Substrings: ${str}, ${subsetStrings(str)}`);

  for (let str of smallWords)
    console.log(`Alphabetical Order: ${str}, ${alphabeticalOrder(str)}`);

  for (let str of largeWords)
    console.log(`To Uppercase: ${str}, ${toUpperFirstLetter(str)}`);
    */
};

tester();
