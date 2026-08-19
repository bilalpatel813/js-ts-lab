'use client';
import {redirect} from 'next/navigation';
export default function products(){
  const handleProduct=()=>{
    console.log("products placed successfully");
    redirect("/product/confirm");
  };
  return <><ul>Products Detials </ul>
  <li>Product item 1</li>
  <li>Product item 2</li>
  <li>Product item 3</li>
 
  <button onClick={handleProduct}>click to confirm products</button>
  </>
}