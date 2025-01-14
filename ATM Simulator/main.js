const input = document.getElementById("pin");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("output");
const logOut = document.getElementById("logout");
const checkBalace = document.getElementById("checkBalance");
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
let balance = 1000;
let isAuthenticated = false;

function logIn(pin) {
  //   console.log(pin);
  if (pin === "1234") {
    output.textContent = "Login successful.";
    logOut.disabled = false;
    isAuthenticated = true;
  } else {
    output.textContent = "Invalid PIN. Please try again.";
    isAuthenticated = false;
  }
}

submitBtn.addEventListener("click", () => {
  let pin = input.value;
  logIn(pin);
  input.value = "";
  //   console.log(logIn());
});

logOut.addEventListener("click", () => {
  isAuthenticated = false;
  logOut.disabled = true;
  output.textContent = "Logged out successfully.";
});

checkBalace.addEventListener("click", () => {
  if (isAuthenticated) {
    output.textContent = `Your balance is ${balance}`;
  } else {
    output.textContent = `Please login first.`;
  }
});

deposit.addEventListener("click", () => {
  if (isAuthenticated) {
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
  if (isAuthenticated) {
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
