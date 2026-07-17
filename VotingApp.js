function displayData() {
  
  let name = document.getElementById("name").value.trim();
  let age = document.getElementById("age").value;
  let vote = document.getElementById("user_vote").value;
  let result = document.getElementById("result");
  
  if (name == "") {
    alert("Enter your name");
    return;
  }
  
  if (age < 18) {
    alert("You are not eligible to vote.");
    return;
  }
  
  result.style.display = "block";
  result.innerHTML =
    `✅ <b>${name}</b> has voted for <b>${vote}</b> in the PM Selection of India.`;
  
}