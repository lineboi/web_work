let getId = (id) => document.getElementById(id);
let getByClass = (className) => document.getElementsByClassName(className);

let cardholder = getId('cardholder'),
    cardnumber = getId('cardnumber'),
    month = getId('month'),
    year = getId('year'),
    cvc = getId('cvc');

let errormsg = getByClass('error');
let main = document.querySelector('.neutral');

main.addEventListener('submit', (e) => {
  e.preventDefault(); 

  detect(cardholder, 0, "it can't be blank");
  detect(cardnumber, 1, "it can't be blank");
  detect(month, 2, "it can't be blank");
  detect(year, 3, "it can't be blank");
  detect(cvc, 4, "it can't be blank");
});

let detect = (input, index, msg) => {
  if (input.value.trim() === "") {
    errormsg[index].innerHTML = msg;
    input.style.border = "1px solid red";
  } else {
    errormsg[index].innerHTML = "";
    input.style.border = "1px solid green";
}
}