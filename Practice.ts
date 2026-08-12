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
console.log(emplo);
const client : Iuser={
  username:"Obaid",
  pass:8137,
}

