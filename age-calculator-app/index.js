const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const daysOutput = document.getElementById("days");
const monthsOutput = document.getElementById("months");
const yearsOutput = document.getElementById("years");
const calculateButton = document.getElementById("btn");

const currentDate = new Date();

const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript

calculateButton.addEventListener("click", () => {
  const birthDay = dayInput.valueAsNumber;
  const birthMonth = monthInput.valueAsNumber;
  const birthYear = yearInput.valueAsNumber;

  // Validate input
  if (!birthDay || !birthMonth || !birthYear) {
    alert("Please enter a valid date.");
    return;
  }

  let ageYears, ageMonths, ageDays;

  // Calculate years
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    ageYears = currentYear - birthYear - 1;
  } else {
    ageYears = currentYear - birthYear;
  }

  // Calculate months
  if (currentMonth < birthMonth) {
    ageMonths = 12 - (birthMonth - currentMonth);
  } else if (currentMonth > birthMonth) {
    ageMonths = currentMonth - birthMonth;
  } else {
    ageMonths = 0;
  }

  // Adjust months if the current day is before the birth day
  if (currentDay < birthDay) {
    ageMonths--;
  }

  // Calculate days
  if (currentDay < birthDay) {
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDays = daysInLastMonth - birthDay + currentDay;
  } else {
    ageDays = currentDay - birthDay;
  }

  // Update the UI
  yearsOutput.textContent = ageYears;
  monthsOutput.textContent = ageMonths;
  daysOutput.textContent = ageDays;
});
