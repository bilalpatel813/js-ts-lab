import Link from "next/link";

export const metadata ={
  title:"Home",
  description:" welcome to home page",
} ;
export default function Home() {
  return (
    <div>
    <h1> home page  </h1>
      <Link href="/profile">profile  </Link>
      <Link href="/about">about  </Link>
      <Link href="/login">login   </Link>
      <Link href="/register">register   </Link>
      <Link href="/product">product   </Link>
      <Link href="/counter">counter   </Link>
      <Link href="/customer">customer   </Link>
      
    </div>
  );
}
