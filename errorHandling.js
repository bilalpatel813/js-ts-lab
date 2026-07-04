//error handling
try{
    const result = 10/0;
    console.log(result);
    JSON.parse("{invalid}");
}catch(error){
    console.log(error.name);
    console.log(error.message);
}finally{
    console.log("Always Run!!")
}
//throwing error
function setAge(age){
    if (age<0){
        throw new Error("Age cannot be negative value");
    }
    return age;
}
try{
    console.log("age :",setAge(-5));
    //console.log("age: ",setAge(19));
}catch(e){
    console.log(e.message);
}
// custom error
class ValidationError extends Error{
    constructor(message,field){
        super(message);
        this.name = "ValidationError";
        this.field= field;
    }
}
try{
    throw new ValidationError("Invalid email","email@123gmail.com")
}catch(e){
    if(ValidationError){
        console.log(`${e.field} ${e.message}`)
    }
}
//practice error program :
class SyntaxError extends Error{
    constructor(message,field){
        super(message);
        this.name = "SyntaxError";
        this.field = field;
    }
}
let password = 12345678;
try {
    user_password = 123345;
    throw new SyntaxError("password must be 8 character",user_password);
}catch(e){
    if(user_password !== password){
        console.log(`${e.message} ${e.field}`)
    }
}