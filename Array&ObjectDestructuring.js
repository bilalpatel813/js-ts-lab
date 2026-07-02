// Destructuring is a JavaScript feature that lets you extract values from objects or arrays and store them in variables
//Array Destructuring
const [a, b, c] = [1,2,3]
const [first,, third] = [1,2,3]
const [frst,...rest] = [1,2,3,4]
console.log(a)
console.log([first,,third])
console.log([...rest])
console.log(frst)
//object destructuring
const {name,age}= {name:"bilal",age:18};
console.log(name,age)
//re-naming variable
const {name:fullname}= {name:"Hamza"}
console.log(fullname)
//defaults value 
const {city = "mumbai"} = {name:"bilal",age:19}
console.log(city,name,age)
//funtion destructuring parameter
function printuser({name,age}){
    console.log(name);
    console.log(age)
}
printuser({name:"adnan",age:2})
//swaping variables
let p= 12;
let q = 20;
[p,q] = [q,p]

console.log("p = "+p)
console.log("q = "+q)

