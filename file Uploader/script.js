const fileInput = document.getElementById("file-input");
const form = document.getElementById("form");
const selectedFileArea = document.getElementById("selected-file-area");

form.addEventListener("click", (e) => {
  fileInput.click();
});

fileInput.addEventListener("change", function (event) {
  const uploadedFile = event.target.files[0];

  const fileName = uploadedFile.name;

  getFileNameWithoutExtention(fileName);

  showSelectedFiles(fileName);
});

function getFileNameWithoutExtention(fileName) {
  //get index of the last
  const lastIndex = fileName.lastIndexOf(",");
  console.log(lastIndex);
}

function showSelectedFiles(fileName) {
  const selectedFileHTML = `<div class="row">
    <i class="fas fa-file-alt"></i>
    <div class="content">
      <div class="details">
        <span class="name">${fileName}</span>
      </div>
    </div>
  </div>`;
  selectedFileArea.innerHTML = selectedFileHTML;
}
