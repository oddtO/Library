(function () {
  let newBookBtn = document.querySelector("button.add-new-book");
  newBookBtn.addEventListener("click", () => {
    let newBookForm = document.querySelector("form.add-new-book");
    newBookForm.style.visibility = "visible";
  });
})();
