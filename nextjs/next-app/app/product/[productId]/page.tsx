
export default async function productList({params}:{params:Promise<{productId:string}>;}) {
  await new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("delayed on purpose to ragebait User!! have fun..")
    },5000)
  })
  const productId = (await params).productId;
  
  return(<>
    <h1>Products Items of Product {productId}:</h1>
  <p> product Item 1 </p>
  <p> product Item 2 </p>
  
  </>);
}