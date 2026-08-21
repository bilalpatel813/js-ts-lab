import Link from "next/link";
export const metadata = {
  title: "authetication ",
};

const  navLink=[
      {name:"Home",href:"/"},
      {name:"Login",href:"/login"},
      {name:"Register",href:"/register"},
];

export default function AuthLayout({ children }: {children:React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <header style ={{
      backgroundColor: "Lightblue",
      padding:"1rem",
        }}><div>
        <p>Nex-app</p>
        {navLink.map((link)=>{
            return (<Link href={link.href} key={link.name}>{link.name}</Link>)
          })};
        </div>
      </header>
        {children}
        <footer style={{
      backgroundColor:"gray",
      padding:"1rem",
        }}>
      <p> Auth Footer </p>
        </footer>
      </body>
    </html>
  );
}
