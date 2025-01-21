const balanceAmount = document.getElementById("balance-amount");
const form = document.getElementById("form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionTypeInput = document.getElementById("transaction-type");
const addButton = document.getElementById("add-button");
const transactionList = document.getElementById("transaction-list");
let balance = 0;

function updateBalance() {
  balanceAmount.textContent = `$${balance.toFixed(2)}`;
}

function addTransactionList(description, amount, type) {
  let li = document.createElement("li");

  let transaction = transactionList.appendChild(li);
  transaction.classList.add(`${type}`);
  transaction.insertAdjacentHTML(
    "beforeend",
    `<span>${description}</span> <span>$${amount}</span>`
  );
  balance += type === "income" ? amount : -amount;
  updateBalance();
  localStorage.setItem("description", description);
  localStorage.setItem("amount", amount);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.valueAsNumber);
  const type = transactionTypeInput.value;

  if (
    description.trim() === "" ||
    isNaN(amount) ||
    amount <= 0 ||
    type === "none"
  ) {
    alert("Please enter a valid description and amount.");
    return;
  }

  addTransactionList(description, amount, type);

  descriptionInput.value = "";
  amountInput.value = "";
  transactionTypeInput.value = "none";
});
