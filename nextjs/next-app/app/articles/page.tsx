import Link from "next/link";
export default function articlePage(){
  return (
    <>
    <div><h1>News Articles</h1></div>
    <div>
    <Link href="/articles/Breaking-News-123?lang=en">read articles in english  </Link>
    <Link href="/articles/Breaking-News-123?lang=fr">read articles in french   </Link>
    <Link href="/articles/Breaking-News-123?lang=es">read articles in Spanish  </Link>
    </div>
    </>
  )
}