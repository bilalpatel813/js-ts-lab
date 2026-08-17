'use client';

import {useState} from "react";


export function Counterfunc(){
  const [count,setCount] = useState(0);
  return(<><h1> Count {count} </h1>
  <button onClick={()=>setCount(count +1)}>Increments by clicking </button>
  </>);
}