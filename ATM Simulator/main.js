const input = document.getElementById("pin");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("output");
const logOut = document.getElementById("logout");
const checkBalace = document.getElementById("checkBalance");
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
let balance = 1000;

function logIn(pin) {
  //   console.log(newpin);
  if (pin === "1234") {
    output.textContent = "Login successful.";
    logOut.disabled = false;
  } else {
    output.textContent = "Invalid PIN. Please try again.";
  }
}

submitBtn.addEventListener("click", () => {
  const pin = input.value;
  logIn(pin);
});

checkBalace.addEventListener("click", () => {
  output.textContent = "Your balance is $1000";
});

deposit.addEventListener("click", () => {
  let depositAmnt = parseInt(prompt("Enter the amount to deposit:"));
  console.log(depositAmnt);

  if (isNaN(depositAmnt)) {
    output.textContent = "Invalid amount. Please try again.";
  } else {
    balance += depositAmnt;
    output.textContent = `Deposited ${depositAmnt}. Your new balance is ${balance}`;
  }
});
