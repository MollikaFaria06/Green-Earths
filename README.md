
#### 7) Create a README file to answer the following question-


#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?



### Answers:


### 1) Difference between var, let, and const


var: Function-scoped  , Re-declaration
Allowed  ,  Re-assignment
Allowed , Hoisting ?
Yes, initialized as undefined  



let: Block-scoped ,  Re-declaration not 
Allowed ,  Re-assignment
Allowed , Hoisting ?
Yes, but in TDZ (Temporal Dead Zone)


const:  Block-scoped ,  Re-declaration not 
Allowed ,  Re-assignment not
Allowed , Hoisting ?
Yes, but in TDZ 



### 2) Difference between map(), forEach(), and filter()  



map(): Transform each element 

forEach(): Execute a function on each element

filter(): Filter elements based on a condition

Demo Example: 


const nums = [1, 2, 3, 4];

// map()
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8]

// forEach()
nums.forEach(n => console.log(n)); // prints 1 2 3 4

// filter()
const evens = nums.filter(n => n % 2 === 0); // [2, 4]




### 3) Arrow Functions in ES6


Arrow functions provide a shorter syntax for writing functions.

They also lexically bind this, meaning this is inherited from the surrounding scope.

Single-line expression → return is implicit.

Multiple statements → use curly braces {} and explicit return.


Demo JS Code: 

// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;



### 4) Destructuring Assignment in ES6


Array Destructuring:

const numbers = [1, 2, 3];
const [a, b] = numbers;
console.log(a, b); 

Object Destructuring:

const person = { name: "Faria Mollika", age: 22 };
const { name, age } = person;
console.log(name, age); 




### 5) Template Literals in ES6


Template literals allow embedding variables and expressions inside strings using backticks `.


Demo Example: 

const name = "Faria Mollika";
const age = 22;

// Traditional string concatenation
const text1 = "My name is " + name + " and I am " + age + " years old.";

// Template literal
const text2 = `My name is ${name} and I am ${age} years old.`;

console.log(text1);
console.log(text2);



Differences from concatenation:

Supports multi-line strings

Cleaner syntax, easier to read

Can embed expressions ${expression} directly
