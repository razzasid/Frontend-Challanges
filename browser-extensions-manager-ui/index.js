const toggleThemeBtn = document.getElementById("toggle-btn");
const themeChangeIcon = document.getElementById("theme-change-icon");
const gridContainer = document.getElementById("grid-container");
const body = document.body;
const showActiveBtn = document.getElementById("show-active");
const showInactiveBtn = document.getElementById("show-inactive");
const showAllBtn = document.getElementById("show-all");

showAllBtn.classList.add("active");

function filterExtensions(type) {
  const boxes = gridContainer.querySelectorAll(".extention-box");

  boxes.forEach((box) => {
    const checkbox = box.querySelector("input[type='checkbox']");
    const isChecked = checkbox.checked;

    if (type === "active") {
      box.style.display = isChecked ? "flex" : "none";
    } else if (type === "inactive") {
      box.style.display = !isChecked ? "flex" : "none";
    } else {
      box.style.display = "flex";
    }
  });

  // Update button active states
  showAllBtn.classList.remove("active");
  showActiveBtn.classList.remove("active");
  showInactiveBtn.classList.remove("active");

  if (type === "active") {
    showActiveBtn.classList.add("active");
  } else if (type === "inactive") {
    showInactiveBtn.classList.add("active");
  } else {
    showAllBtn.classList.add("active");
  }
}

// Set initial theme on page load based on localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeChangeIcon.src = "assets/images/icon-sun.svg";
} else {
  body.classList.remove("dark-mode");
  themeChangeIcon.src = "assets/images/icon-moon.svg";
}

// Theme toggle logic
toggleThemeBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");

  if (isDark) {
    body.classList.remove("dark-mode");
    themeChangeIcon.src = "assets/images/icon-moon.svg";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark-mode");
    themeChangeIcon.src = "assets/images/icon-sun.svg";
    localStorage.setItem("theme", "dark");
  }
});

fetch("data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then((data) => {
    // console.log(data);

    data.forEach((item) => {
      gridContainer.innerHTML += `
      <div class="extention-box">

              <div class="extention-main">
                <div class="extention-icon">
                  <img src=${item.logo} alt="${item.name} icon" />
                </div>
                <div class="extention-details">
                  <h2>${item.name}</h2>
                  <p class="extention-description">
                    ${item.description}
                  </p>
                </div>
              </div>

              <div class="extention-bottom">
              <button class="remove-btn">Remove</button>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>

      </div>`;
    });

    gridContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        e.target.closest(".extention-box").remove();
      }
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

showActiveBtn.addEventListener("click", () => filterExtensions("active"));
showInactiveBtn.addEventListener("click", () => filterExtensions("inactive"));
showAllBtn.addEventListener("click", () => filterExtensions("all"));
