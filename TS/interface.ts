//Interfaces

interface Iuser {
  username: string;
  pass:number;
}
interface Iemployee extends Iuser {
  employeeId:number;
}
const emplo :Iemployee = {
  username:"bilal",
  pass:1234,
  employeeId:1,
}
console.log("employee: ",emplo);
const client : Iuser={
  username:"Obaid",
  pass:8137,
}
console.log("client :",client);


interface Iauthor {
  id :number;
  name:string;
}
interface Icategory {
  id :number;
  title:string;
}

interface  Ipost  {
  id : number;
  name:string;
  desc:string;
  extra:Iauthor | Icategory ;
} 

let user: Iauthor = {
  id:1,
  name:"BilalUser"
  
}
let userpost :Ipost ={
  id:1,
  name:"BilalUser",
  desc:"Code",
  extra: user
}
console.log("post: ",userpost);
//generics
interface Ipost2 <T>{
  id :number;
  name:string;
  title:string;
  desc:string;
  extra : T[]
}
const user2 : Ipost2 <String> = {
  id : 2,
  name:"BilalUser",
  title:"coding challenge",
  desc:"DSA Leetcode Q no. 2995",
  extra: ["leetcode","neetcode"]
}

console.log("user2",user2);




