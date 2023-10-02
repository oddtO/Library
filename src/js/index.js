import "../css/reset.css";
import "../css/style.css";
import Book from "./book.js";
import Library from "./library.js";

(function () {
  const newBookBtn = document.querySelector("button.add-new-book");
  const newBookForm = document.querySelector("form.add-new-book");

  newBookBtn.addEventListener("click", () => {
    newBookForm.style.visibility = "visible";
  });

  const library = new Library(document.querySelector("#simple-library"));

  const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

  library.addBook(book);
})();
