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




