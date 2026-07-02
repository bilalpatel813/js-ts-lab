//callbacks
function getdata(data,getNextData){
    setTimeout(()=>{
        console.log("data",data)
        if(getNextData){
            getNextData()
        }
    },3000)
}
//callback hell
console.log("gettting data1...")
getdata(1,()=>{
    console.log("getting data2.....")
    getdata(2,()=>{
        console.log("getting data 3 ...")
        getdata(3)
    })
});

//promisses
function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const result =false;
            if(result){
                resolve(
                    "data loaded successfully"
                )
            }else reject("error loading data")
        },2000)
    })
}
fetchData()
.then(data=>{console.log(data)})
.catch(err=>{console.error(err)})
.finally(()=>{console.log("done")});
//practice program: 
function getinfo(info){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log("you information :",info);
          resolve("success");
        },3000)
    })
}
getinfo("my name is bilal")
.then((res)=>{console.log(res)})
