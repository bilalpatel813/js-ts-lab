export default async function productList({params}:{params:Promise<{productId:string}>;}) {
  const productId = (await params).productId;
  return(<> <h1>Products Items of Product {productId}:</h1>
  <p> product Item 1 </p>
  <p> product Item 2 </p>
  </>);
}