const input = document.getElementById("pin");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("output");
const logOut = document.getElementById("logout");
const checkBalace = document.getElementById("checkBalance");
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
let balance = 1000;
let isLogOut = false;

function logIn(pin) {
  //   console.log(pin);
  if (pin === "1234") {
    output.textContent = "Login successful.";
    logOut.disabled = false;
    isLogOut = true;
  } else {
    output.textContent = "Invalid PIN. Please try again.";
    isLogOut = false;
  }
}

submitBtn.addEventListener("click", () => {
  let pin = input.value;
  logIn(pin);
  input.value = "";
  //   console.log(logIn());
});

logOut.addEventListener("click", () => {
  isLogOut = false;
  logOut.disabled = true;
  output.textContent = "Logged out successfully.";
});

checkBalace.addEventListener("click", () => {
  if (isLogOut) {
    output.textContent = `Your balance is ${balance}`;
  } else {
    output.textContent = `Please login first.`;
  }
});

deposit.addEventListener("click", () => {
  if (isLogOut) {
    let depositAmnt = parseInt(prompt("Enter the amount to deposit:"));
    console.log(depositAmnt);

    if (isNaN(depositAmnt)) {
      output.textContent = "Invalid amount. Please try again.";
    } else {
      balance += depositAmnt;
      output.textContent = `Deposited ${depositAmnt}. Your new balance is ${balance}`;
    }
  } else {
    output.textContent = `Please login first.`;
  }
});

withdraw.addEventListener("click", () => {
  if (isLogOut) {
    let withdrawAmnt = parseInt(prompt("Enter the amount to withdraw:"));
    console.log(withdrawAmnt);

    if (isNaN(withdrawAmnt) || withdrawAmnt > balance) {
      output.textContent =
        "Invalid amount or insufficient balance. Please try again.";
    } else {
      balance -= withdrawAmnt;
      output.textContent = `Withdrawn ${withdrawAmnt}. Your new balance is ${balance}`;
    }
  } else {
    output.textContent = `Please login first.`;
  }
});
