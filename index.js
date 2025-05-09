let getId = (id) => document.getElementById(id);
let getByClass = (className) => document.getElementsByClassName(className);

let cardholder = getId('cardholder'),
    cardnumber = getId('cardnumber'),
    month = getId('month'),
    year = getId('year'),
    cvc = getId('cvc'),
    first=getId('first'),
    last=getId('last'),
    n1 = getId('n1'),
    n2 = getId('n2'),
    n3 = getId('n3'),
    n4 = getId('n4'),
    cardnumberError = getId('cardnumber-error');;

let errormsg = getByClass('error');
let main = document.querySelector('.neutral');
let mm = getId('mm');
let yy = getId('yy');
let cvv = getId('cvv');

cvc.addEventListener('input', () => {
  let value = cvc.value.replace(/\D/g, '').slice(0, 3); // Remove non-digits and limit to 3 chars
  cvc.value = value;
  cvv.textContent = value.padStart(3, '0');
});

month.addEventListener('input', () => {
  mm.textContent = month.value.padStart(2, '0');
});

year.addEventListener('input', () => {
  yy.textContent = year.value.padStart(2, '0');
});



cardholder.addEventListener('input',() =>{
    let value=cardholder.value.trim();
   if(value===""){
    first.textContent="Gwiza";
    last.textContent="moise1";
   }else{
     let fistspace=value.indexOf(' ');
     if(fistspace===-1){
        first.textContent=value;
        last.textContent="";

     }else{
        first.textContent=value.substring(0,fistspace);
        last.textContent=value.substring(fistspace+1);     
     }
   }
})

cardnumber.addEventListener('input', () => {
  let value = cardnumber.value.replace(/\s/g, ''); 
  if (value.length > 16) {
    value = value.substring(0, 16); 
    cardnumber.value = value; 
  }

  cardnumber.value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

  n1.textContent = value.substring(0, 4).padEnd(4, "0");
  n2.textContent = value.substring(4, 8).padEnd(4, "0");
  n3.textContent = value.substring(8, 12).padEnd(4, "0");
  n4.textContent = value.substring(12, 16).padEnd(4, "0");

  if (value.length < 16) {
    cardnumberError.textContent = "Wrong input: Card number must be 16 digits";
    cardnumber.style.border = "1px solid red";
  } else {
    cardnumberError.textContent = "";
    cardnumber.style.border = "1px solid green";
  }
});

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