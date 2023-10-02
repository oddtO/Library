import Book from "./book.js";

export default class Library {
  constructor(bookTable) {
    this.bookTable = bookTable;
    this.bookList = [];

    const relatedAddForm = document.querySelector(
      `form[data-related-table-id=${this.bookTable.id}]`,
    );
    relatedAddForm.addEventListener("submit", this.addBookToTable.bind(this));

    this.bookTable.addEventListener(
      "click",
      this.removeBookFromTable.bind(this),
    );
    this.bookTable.addEventListener(
      "click",
      this.toggleReadStateInTable.bind(this),
    );
  }

  addBook(book) {
    this.bookList.push(book);
    this.render();
  }
  removeBook(bookIndex) {
    this.bookList.splice(bookIndex, 1);
    this.render();
  }
  changeReadState(bookIndex) {
    const book = this.bookList[bookIndex];
    book._isFinishedReading = !book._isFinishedReading;
    this.render();
  }
  render() {
    this.bookTable.tBodies[0].innerHTML = "";
    // for (let book of this.bookList) {
    for (let i = 0; i < this.bookList.length; ++i) {
      const book = this.bookList[i];
      const row = renderBookOnTableRow(book);

      row.dataset.finishedReading = book._isFinishedReading;

      row.dataset.bookId = i;
      this.bookTable.tBodies[0].append(row);
    }

    function renderBookOnTableRow(book) {
      const row = document.createElement("tr");

      for (const bookField in book) {
        if (typeof book[bookField] == "function") continue;

        row.append(createCell(book[bookField]));
      }
      row.append(createCell("🕮"));
      row.append(createCell("❌"));

      return row;
      function createCell(content) {
        const cell = document.createElement("td");
        cell.textContent = content;
        return cell;
      }
    }
  }
  addBookToTable(event) {
    event.preventDefault();
    const form = event.target;
    this.addBook(
      new Book(
        form.title.value,
        form.author.value,
        +form["page-count"].value,
        form["read-status"].checked,
      ),
    );
    form.reset();
  }
  removeBookFromTable(event) {
    if (!event.target.matches("td:last-child")) return;
    const bookRowToDelete = event.target.parentElement;
    this.removeBook(bookRowToDelete.dataset.bookId);
  }
  toggleReadStateInTable(event) {
    if (!event.target.matches("td:nth-last-child(2)")) return;
    const bookRowToChangeState = event.target.parentElement;

    this.changeReadState(bookRowToChangeState.dataset.bookId);
  }
}
