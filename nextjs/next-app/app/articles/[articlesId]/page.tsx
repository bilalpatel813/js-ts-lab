'use client'
import Link from "next/link";
import {use} from "react";

export default function articles({params,searchParams}:{params:
  Promise<{articlesId:string}>;searchParams:Promise<{lang?:"en"|"fr"|"es"}>;}) {
 
const {articlesId}= use(params);
const {lang="en"}=use(searchParams);
  return (
<>
  <h1>Article no. {articlesId}</h1>
    <p>Reading in language {lang}</p>
    <div>
    <Link href={`/articles/${articlesId}?lang=en`}> click for English</Link>
    <Link href={`/articles/${articlesId}?lang=es`}> click for Spanish</Link>
    <Link href={`/articles/${articlesId}?lang=fr`}> click for french </Link>
    </div>
  </>
 )
}