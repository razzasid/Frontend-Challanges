const balanceAmount = document.getElementById("balance-amount");
const form = document.getElementById("form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionTypeInput = document.getElementById("transaction-type");
const addButton = document.getElementById("add-button");
const transactionList = document.getElementById("transaction-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");

let balance = 0;
let transactionId = 1;
let totalIncomeValue = 0;
let totalExpenseValue = 0;

function updateBalance() {
  balanceAmount.textContent = `$${balance.toFixed(2)}`;
}

function addTransactionList(description, amount, type, transactionId) {
  transactionList.insertAdjacentHTML(
    "beforeend",
    `<div class="list-with-delete" data-id="${transactionId}">
      <li class=${type}>
        <span>${description}</span><span>$${amount}</span>
      </li>
      <div class="delete"><i class="fa-solid fa-trash"></i></div>
    </div>`
  );

  balance += type === "income" ? amount : -amount;
  localStorage.setItem("balance", balance);
  if (type === "income") {
    totalIncomeValue += amount;
    localStorage.setItem("total income", totalIncomeValue);
    totalIncome.textContent = `$${totalIncomeValue.toFixed(2)}`;
  } else {
    totalExpenseValue += amount;
    totalExpense.textContent = `$${totalExpenseValue.toFixed(2)}`;
    localStorage.setItem("total expense", totalExpenseValue);
  }

  updateBalance();
}

function saveData() {
  localStorage.setItem("listdata", transactionList.innerHTML);
}

function showData() {
  const listdata = localStorage.getItem("listdata");
  const balanceData = parseFloat(localStorage.getItem("balance")) || 0;
  const incomeData = parseFloat(localStorage.getItem("total income")) || 0;
  const expenseData = parseFloat(localStorage.getItem("total expense")) || 0;

  balance = balanceData;
  totalIncomeValue = incomeData;
  totalExpenseValue = expenseData;

  if (listdata) {
    transactionList.innerHTML = listdata;
    balanceAmount.textContent = `$${balanceData.toFixed(2)}`;
    totalIncome.textContent = `$${incomeData.toFixed(2)}`;
    totalExpense.textContent = `$${expenseData.toFixed(2)}`;
  }
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

  addTransactionList(description, amount, type, transactionId);
  saveData();
  transactionId++;
  descriptionInput.value = "";
  amountInput.value = "";
  transactionTypeInput.value = "none";
});

transactionList.addEventListener("click", (event) => {
  if (event.target.closest(".delete")) {
    const transactionDiv = event.target.closest(".list-with-delete");
    const transactionAmount = parseFloat(
      transactionDiv.querySelector("li span:nth-child(2)").textContent
    );
    const transactionType = transactionDiv.querySelector("li").className;

    // Adjust balance
    balance -=
      transactionType === "income" ? transactionAmount : -transactionAmount;
    updateBalance();
    localStorage.setItem("balance", balance.toString());

    if (transactionType === "income") {
      totalIncomeValue -= transactionAmount;
      localStorage.setItem("total income", totalIncomeValue.toString());
      totalIncome.textContent = `$${totalIncomeValue.toFixed(2)}`;
    } else {
      totalExpenseValue -= transactionAmount;
      localStorage.setItem("total expense", totalExpenseValue.toString());
      totalExpense.textContent = `$${totalExpenseValue.toFixed(2)}`;
    }

    saveData();
    // Remove the transaction from the DOM
    transactionDiv.remove();
  }
});

showData();
