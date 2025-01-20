const balanceAmount = document.getElementById("balance-amount");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionTypeInput = document.getElementById("transaction-type");
const addButton = document.getElementById("add-button");
const transactionList = document.getElementById("transaction-list");
let balance = 0;

function updateBalance() {
  balanceAmount.textContent = `$${balance.toFixed(2)}`;
}

function addTransactionList(option) {
  let li = document.createElement("li");

  let addSpan = transactionList.appendChild(li);
  addSpan.classList.add(`${option}`);
  addSpan.insertAdjacentHTML(
    "beforeend",
    `<span>${descriptionInput.value}</span> <span>$${amountInput.valueAsNumber}</span>`
  );
}

addButton.addEventListener("click", () => {
  let amount = parseFloat(amountInput.valueAsNumber);
  let transactionType = transactionTypeInput.value;

  if (amount !== "" && descriptionInput.value.trim() !== "" && amount >= 0) {
    if (transactionType === "income") {
      balance += amount;
      updateBalance();
      addTransactionList("income");
    }

    if (transactionType === "expense") {
      balance -= amount;
      updateBalance();
      addTransactionList("expense");
    }
  } else {
    alert("Please enter a valid description and amount.");
  }

  descriptionInput.value = "";
  amountInput.value = "";
});
