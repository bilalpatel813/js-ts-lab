//array Destructuring

const [a, b, c] = [1, 2, 3];
const [first, , third] = [1, 2, 3];      // skip elements
const [x, ...rest] = [1, 2, 3, 4];       
// Swap variables
let p = 1, q = 2;
[p, q] = [q, p];

console.log(a,b,c)
console.log(first, third)
console.log(rest)
console.log(p,q)

//Object Destructuring
const { name, age } = { name: "Addy", age: 19 };
const { name: fullName } = { name: "Addy" };    
const { city = "Unknown" } = { name: "Addy" };  

function printUser({ name, age }) {   
  console.log(`${name}, ${age}`);
}

printUser({
    name: "Adnan",
    age: 20
})

//Spread Operator
// Arrays
const fruits = ["Apple", "Banana"];
const vegetables = ["Carrot", "Potato"];  
const food = [...fruits, ...vegetables];         
console.log(food)


// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  
console.log(obj2)

// Function calls
function add3(a, b, c) { return a + b + c; }
add3(...[1, 2, 3]); // 6

// Rest Operator
function sum(...numbers){
    return numbers.reduce((total, current) => total + current, 0);
}

console.log(sum(10,20,30));