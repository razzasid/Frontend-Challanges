const inputValue = document.getElementById("inputBox");
const colorBtn = document.querySelector("#colorButton");
const items = document.querySelectorAll(".item");

let dataValue = 0;

function colorItem() {
  if (dataValue) {
    items[dataValue - 1].classList.remove("active");
  }

  dataValue = inputValue.valueAsNumber;

  const selectedItems = items[dataValue - 1];
  selectedItems.classList.add("active");

  inputValue.value = "";
}

colorBtn.addEventListener("click", colorItem);

inputValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    colorItem();
  }
});

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    inputValue.value = index + 1;
    colorItem();
  });
});
