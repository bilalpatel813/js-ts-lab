let name:string; name="bilal";
console.log(name); 
let age :number = 19; 
console.log(age);
let obj :{ 
email:string; 
pass:number;
};
obj={
email:"addy@gmail.com",
pass:0
};
obj.email="bilal@gmail.com";
obj.pass = 1234;

console.log(obj.email,obj.pass);

let ReturnStringFunc=():string=>{
  return "Bilal";
}

console.log(ReturnStringFunc());




