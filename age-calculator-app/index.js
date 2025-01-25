const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const days = document.getElementById("days");
const months = document.getElementById("months");
const years = document.getElementById("years");
const btn = document.getElementById("btn");

const currentDate = new Date();

const getDate = currentDate.getDate();
const getyear = currentDate.getFullYear();
const getMonth = currentDate.getMonth() + 1;

btn.addEventListener("click", () => {
  const dayInputValue = dayInput.valueAsNumber;
  const monthInputValue = monthInput.valueAsNumber;
  const yearInputValue = yearInput.valueAsNumber;
  let totalYears;

  if (monthInputValue > getMonth && dayInputValue < getDate) {
    totalYears = getyear - yearInputValue - 1;
    console.log(totalYears);
  } else {
    totalYears = getyear - yearInputValue;
    console.log(totalYears);
  }

  //   console.log(dayInputValue, monthInputValue, yearInputValue);
});
