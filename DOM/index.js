let el = document.getElementById("head"); // elements I'd by getElement 
console.log(el)
let c = document.querySelector(".myClass") // class by querySelector 
let i = document.querySelector("#head") //id by querySelector 
let t = document.querySelector("p") // selected tag by querySelector 
console.log(i.textContent)// textContent give text inside class, element or tag. 
console.log(c.textContent);
console.log(t.textContent)
console.log("hello")// hello  by Bilal dev! 
const paragraphs = document.querySelectorAll("p");//selected all same tag in file 
console.log(paragraphs[0].textContent); //getting  tag like  array indexing  
console.log(paragraphs);
let divs = document.getElementsByTagName("div");
console.log(divs)//gives html collection like and array 
// changing html test through js on DOM
el.innerHTML = "<b>Bold</b>";
t.textContent = " changed the Para element/tag"
// changing CSS 
el.style.color ="blue"
el.style.backgroundColor= "black"
el.style.fontSize = "24px"
