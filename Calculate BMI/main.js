const weight = document.getElementById("weight");
const height = document.getElementById("height");
const calculateBtn = document.getElementById("calculateBtn");
const container = document.querySelector(".container");

function bmiCalculation() {
  //BMI = weight (kg) / [height (cm) / height (cm)] x 10,000

  let weightValue = weight.valueAsNumber;
  let heightValue = height.valueAsNumber;

  let bmi = ((weightValue / (heightValue * heightValue)) * 10000).toFixed(2);

  const newElement = document.createElement("h1");
  newElement.id = "bmi-result";
  newElement.textContent = bmi;

  const oldResult = document.getElementById("bmi-result");
  if (oldResult) {
    oldResult.remove();
  }
  container.appendChild(newElement);
}

calculateBtn.addEventListener("click", bmiCalculation);

function handleEnterKey(event) {
  if (event.key === "Enter") {
    bmiCalculation();
  }
}

weight.addEventListener("keypress", handleEnterKey);
