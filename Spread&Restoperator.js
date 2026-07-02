/*
Spread operator-> Expands an array / object into individual values.
Rest operator-> Collects multiple values into one array / object. 
*/

// spread operator
//arrays : 
const arr1 = [1,2,3]
const arr2 = [...arr1,4,5,6]
const copy =[...arr2]
console.log("arr1 :" +arr1)
console.log("arr2 :" +arr2)
console.log("merge of both array (copy of arr2) :" +copy)
//objects
const obj1 ={a:1,b:2};
const obj2 = {...obj1, c:3}
const copyobj = {...obj2}
console.log("obj1 :" +obj1.a,obj1.b)
console.log("copy object merging both objects :"+copyobj.a,copyobj.b,copyobj.c)
//rest operator 
function sum(...rest) {
  return rest.reduce((a,b)=>a+b, 0)
}
console.log("sum of 1 to 5 : "+sum(1,2,3,4,5))
//rest with obejct destructuring 
const {a,...others}={ a:1,b:2,c:3,d:4}
console.log(a,others)
//practice code:
function int(...nums) {return nums};
console.log(int(1,2,3,4))
