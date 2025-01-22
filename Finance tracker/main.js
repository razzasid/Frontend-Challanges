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
let totalIncomeValue = 0;
let totalExpenseValue = 0;

function updateBalance() {
  balanceAmount.textContent = `$${balance.toFixed(2)}`;
}

function addTransactionList(description, amount, type) {
  transactionList.insertAdjacentHTML(
    "beforeend",
    `<div class="list-with-delete">
      <li class=${type}>
        <span>${description}</span><span>$${amount}</span>
      </li>
      <div class="delete"><i class="fa-solid fa-trash"></i></div>
    </div>`
  );

  balance += type === "income" ? amount : -amount;
  localStorage.setItem("balance", balance.toString());
  if (type === "income") {
    totalIncomeValue += amount;
    localStorage.setItem("total income", totalIncomeValue.toString());
    totalIncome.textContent = `$${totalIncomeValue.toFixed(2)}`;
  } else {
    totalExpenseValue += amount;
    localStorage.setItem("total expense", totalExpenseValue.toString());
    totalExpense.textContent = `$${totalExpenseValue.toFixed(2)}`;
  }

  updateBalance();
}

function saveData() {
  try {
    localStorage.setItem("listData", transactionList.innerHTML);
  } catch (error) {
    console.error("Failed to save data:", error);
    alert("Unable to save transaction. Storage may be full or disabled.");
  }
}

function showData() {
  try {
    const listData = localStorage.getItem("listData");
    const balanceData = parseFloat(localStorage.getItem("balance")) || 0;
    const incomeData = parseFloat(localStorage.getItem("total income")) || 0;
    const expenseData = parseFloat(localStorage.getItem("total expense")) || 0;
    balance = balanceData;
    totalIncomeValue = incomeData;
    totalExpenseValue = expenseData;

    if (listData) {
      transactionList.innerHTML = listData;
      balanceAmount.textContent = `$${balanceData.toFixed(2)}`;
      totalIncome.textContent = `$${incomeData.toFixed(2)}`;
      totalExpense.textContent = `$${expenseData.toFixed(2)}`;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
    alert("Unable to load saved transactions.");
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

  addTransactionList(description, amount, type);
  saveData();
  descriptionInput.value = "";
  amountInput.value = "";
  transactionTypeInput.value = "none";
});

transactionList.addEventListener("click", (event) => {
  if (event.target.closest(".delete")) {
    const transactionDiv = event.target.closest(".list-with-delete");
    const transactionAmount = parseFloat(
      transactionDiv
        .querySelector("li span:nth-child(2)")
        .textContent.replace("$", "")
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
    transactionDiv.remove();
  }
});

showData();
