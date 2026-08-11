// Type Allias
type userType={
username:string;
pass:number;
theme:"dark"|"light";
}
let profile=():userType=>{
return {
"username":"bilal",
"pass":123344
};}
let userWithTheme:userType={
username:"adnan",
pass:1234,
theme:"dark"
}
console.log(userWithTheme);
console.log("admin :",profile());


