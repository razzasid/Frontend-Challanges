const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const daysOutput = document.getElementById("days");
const monthsOutput = document.getElementById("months");
const yearsOutput = document.getElementById("years");
const calculateButton = document.getElementById("btn");
const inputParents = document.querySelectorAll(".input");
const labels = document.querySelectorAll(".input label");
const inputs = document.querySelectorAll(".input input");

// Function to check if a date is valid
function isValidDate(day, month, year) {
  // Create date object and verify the date is valid
  const date = new Date(year, month - 1, day);

  // Check if date is in the future
  if (date > new Date()) {
    return false;
  }

  // Verify the date components match what was passed
  // This catches invalid dates like February 30th
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

// Function to remove error state
function removeErrorState(inputParent) {
  const existingError = inputParent.querySelector(".error-empty");
  if (existingError) {
    inputParent.removeChild(existingError);
  }
  inputParent.classList.remove("input-error");
  inputParent.querySelector("label").classList.remove("error");
  inputParent.querySelector("input").classList.remove("input-error");
}

// Function to add error state
function addErrorState(inputParent, message = "This field is required") {
  removeErrorState(inputParent); // Remove any existing error first
  const pTag = document.createElement("p");
  pTag.textContent = message;
  pTag.classList.add("error-empty");
  inputParent.appendChild(pTag);
  inputParent.classList.add("input-error");
  inputParent.querySelector("label").classList.add("error");
  inputParent.querySelector("input").classList.add("input-error");
}

// Clear error state on input interaction
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const inputParent = input.parentElement;
    removeErrorState(inputParent);
  });
});

// Calculate age on button click
calculateButton.addEventListener("click", () => {
  const birthDay = dayInput.valueAsNumber;
  const birthMonth = monthInput.valueAsNumber;
  const birthYear = yearInput.valueAsNumber;

  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  const currentYear = currentDate.getFullYear();

  // Remove existing error messages first
  inputParents.forEach((inputParent) => {
    removeErrorState(inputParent);
  });

  // Validate empty inputs
  let hasError = false;
  if (!birthDay) {
    addErrorState(dayInput.parentElement);
    hasError = true;
  }
  if (!birthMonth) {
    addErrorState(monthInput.parentElement);
    hasError = true;
  }
  if (!birthYear) {
    addErrorState(yearInput.parentElement);
    hasError = true;
  }
  if (hasError) return;

  // Validate date
  if (!isValidDate(birthDay, birthMonth, birthYear)) {
    addErrorState(dayInput.parentElement, "Must be a valid date");
    addErrorState(monthInput.parentElement, "Must be a valid month");
    addErrorState(yearInput.parentElement, "Must be in the past");
    return;
  }

  let ageYears, ageMonths, ageDays;

  // Calculate years
  ageYears = currentYear - birthYear;

  // Calculate months
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    ageYears--;
    ageMonths = 12 - (birthMonth - currentMonth);
  } else {
    ageMonths = currentMonth - birthMonth;
  }

  // Adjust months if the current day is before the birth day
  if (currentDay < birthDay) {
    ageMonths = (ageMonths + 11) % 12;
    if (ageMonths === 11) ageYears--;
  }

  // Calculate days
  const birthDate = new Date(currentYear, birthMonth - 1, birthDay); // Use current year for comparison
  let daysInLastMonth;

  if (currentDay < birthDay) {
    // Get the number of days in the previous month
    daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageDays = daysInLastMonth - birthDay + currentDay;
  } else {
    ageDays = currentDay - birthDay;
  }

  // Handle edge case where calculated values are negative
  if (ageYears < 0) ageYears = 0;
  if (ageMonths < 0) ageMonths = 0;
  if (ageDays < 0) ageDays = 0;

  // Update the UI with animation
  const elements = [
    { output: yearsOutput, value: ageYears },
    { output: monthsOutput, value: ageMonths },
    { output: daysOutput, value: ageDays },
  ];

  elements.forEach(({ output, value }) => {
    output.textContent = value;
  });
});
