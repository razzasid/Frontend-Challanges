const form = document.querySelector("form");
const input = document.querySelector("input");
const lowerCase = document.getElementById("lowercase");
const upperCase = document.getElementById("uppercase");
const camelCase = document.getElementById("camelcase");
const pascalCase = document.getElementById("pascalcase");
const snakeCase = document.getElementById("snakecase");
const kebabCase = document.getElementById("kebabcase");
const trim = document.getElementById("trim");

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function toPascalCase(str) {
  return str
    .replace(/\w+/g, function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .replace(/\s+/g, "");
}

function toSnakeCase(str) {
  return str
    .trim() // Remove extra spaces from the start and end
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .toLowerCase(); // Convert the entire string to lowercase
}

function toKebabCase(str) {
  return str
    .trim() // Remove extra spaces from the start and end
    .replace(/\s+/g, "-") // Replace spaces with underscores
    .toLowerCase(); // Convert the entire string to lowercase
}

function toTrim(str) {
  return str
    .trim() // Remove extra spaces from the start and end
    .replace(/\s+/g, "") // Replace spaces with underscores
    .toLowerCase(); // Convert the entire string to lowercase
}

function onLoad(input) {
  lowerCase.textContent = input.toLowerCase();
  upperCase.textContent = input.toUpperCase();
  camelCase.textContent = toCamelCase(input);
  pascalCase.textContent = toPascalCase(input);
  snakeCase.textContent = toSnakeCase(input);
  kebabCase.textContent = toKebabCase(input);
  trim.textContent = toTrim(input);
}

form.addEventListener("input", (e) => {
  e.preventDefault();

  let inputValue = input.value;
  lowerCase.textContent = inputValue.toLowerCase();
  upperCase.textContent = inputValue.toUpperCase();
  camelCase.textContent = toCamelCase(inputValue);
  pascalCase.textContent = toPascalCase(inputValue);
  snakeCase.textContent = toSnakeCase(inputValue);
  kebabCase.textContent = toKebabCase(inputValue);
  trim.textContent = toTrim(inputValue);
});

onLoad(input.value);
