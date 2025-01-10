const form = document.querySelector("form");
const input = document.querySelector("input");
const lowerCase = document.getElementById("lowercase");
const upperCase = document.getElementById("uppercase");
const camelCase = document.getElementById("camelcase");
const pascalCase = document.getElementById("pascalcase");
const snakeCase = document.getElementById("snakecase");
const kebabCase = document.getElementById("kebabcase");
const trim = document.getElementById("trim");

function normalizeString(str) {
  return str.trim().replace(/\s+/g, " ");
}

function toCamelCase(str) {
  return normalizeString(str)
    .toLowerCase()
    .split(" ")
    .reduce((a, b) => a + b[0]?.toUpperCase() + b.substring(1).toLowerCase());
}

function toPascalCase(str) {
  if (!str.trim()) return ""; // Return an empty string if input is empty or only spaces
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word) // Remove empty strings from the array
    .reduce(
      (a, b) => a + b[0]?.toUpperCase() + b.substring(1).toLowerCase(),
      ""
    );
}

function toSnakeCase(str) {
  return normalizeString(str).split(" ").join("_");
}

function toKebabCase(str) {
  return normalizeString(str).split(" ").join("-");
}

function toTrim(str) {
  return normalizeString(str).split(" ").join("");
}

function updateTransformations(inputValue) {
  lowerCase.textContent = inputValue.toLowerCase();
  upperCase.textContent = inputValue.toUpperCase();
  camelCase.textContent = toCamelCase(inputValue);
  pascalCase.textContent = toPascalCase(inputValue);
  snakeCase.textContent = toSnakeCase(inputValue);
  kebabCase.textContent = toKebabCase(inputValue);
  trim.textContent = toTrim(inputValue);
}

input.addEventListener("input", (e) => {
  e.preventDefault();
  updateTransformations(input.value);
});

// Initialize on page load
updateTransformations(input.value || "");
