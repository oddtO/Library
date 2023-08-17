(function () {
  let newBookBtn = document.querySelector("button.add-new-book");
  let newBookForm = document.querySelector("form.add-new-book");

  newBookBtn.addEventListener("click", () => {
    newBookForm.style.visibility = "visible";
  });

  class Library {
    constructor(bookTable) {
      this.bookTable = bookTable;
      this.bookList = [];

      let relatedAddForm = document.querySelector(
        `form[data-related-table-id=${this.bookTable.id}]`
      );
      relatedAddForm.addEventListener("submit", this.addBookToTable.bind(this));

      this.bookTable.addEventListener(
        "click",
        this.removeBookFromTable.bind(this)
      );
      this.bookTable.addEventListener(
        "click",
        this.toggleReadStateInTable.bind(this)
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
      let book = this.bookList[bookIndex];
      book._isFinishedReading = !book._isFinishedReading;
      this.render();
    }
    render() {
      this.bookTable.tBodies[0].innerHTML = "";
      // for (let book of this.bookList) {
      for (let i = 0; i < this.bookList.length; ++i) {
        let book = this.bookList[i];
        let row = renderBookOnTableRow(book);

        row.dataset.finishedReading = book._isFinishedReading;

        row.dataset.bookId = i;
        this.bookTable.tBodies[0].append(row);
      }

      function renderBookOnTableRow(book) {
        let row = document.createElement("tr");

        for (let bookField in book) {
          if (typeof book[bookField] == "function") continue;

          row.append(createCell(book[bookField]));
        }
        row.append(createCell("🕮"));
        row.append(createCell("❌"));

        return row;
        function createCell(content) {
          let cell = document.createElement("td");
          cell.textContent = content;
          return cell;
        }
      }
    }
    addBookToTable(event) {
      event.preventDefault();
      let form = event.target;
      this.addBook(
        new Book(
          form.title.value,
          form.author.value,
          +form["page-count"].value,
          form["read-status"].checked
        )
      );
    }
    removeBookFromTable(event) {
      if (!event.target.matches("td:last-child")) return;
      let bookRowToDelete = event.target.parentElement;
      this.removeBook(bookRowToDelete.dataset.bookId);
    }
    toggleReadStateInTable(event) {
      if (!event.target.matches("td:nth-last-child(2)")) return;
      let bookRowToChangeState = event.target.parentElement;

      this.changeReadState(bookRowToChangeState.dataset.bookId);
    }
  }
  let library = new Library(document.querySelector("#simple-library"));

  /* let library = (function (bookTable) {
    let proto = {
      addBook(book) {
        this.bookList.push(book);
        this.render();
      },
      removeBook(bookIndex) {
        this.bookList.splice(bookIndex, 1);
        this.render();
      },
      changeReadState(bookIndex) {
        let book = this.bookList[bookIndex];
        book._isFinishedReading = !book._isFinishedReading;
        this.render();
      },
      render() {
        this.bookTable.tBodies[0].innerHTML = "";
        // for (let book of this.bookList) {
        for (let i = 0; i < this.bookList.length; ++i) {
          let book = this.bookList[i];
          let row = renderBookOnTableRow(book);

          row.dataset.finishedReading = book._isFinishedReading;

          row.dataset.bookId = i;
          this.bookTable.tBodies[0].append(row);
        }

        function renderBookOnTableRow(book) {
          let row = document.createElement("tr");

          for (let bookField in book) {
            if (typeof book[bookField] == "function") continue;

            row.append(createCell(book[bookField]));
          }
          row.append(createCell("🕮"));
          row.append(createCell("❌"));

          return row;
          function createCell(content) {
            let cell = document.createElement("td");
            cell.textContent = content;
            return cell;
          }
        }
      },
      addBookToTable(event) {
        event.preventDefault();
        let form = event.target;
        this.addBook(
          createBook(
            form.title.value,
            form.author.value,
            +form["page-count"].value,
            form["read-status"].checked
          )
        );
      },
      removeBookFromTable(event) {
        if (!event.target.matches("td:last-child")) return;
        let bookRowToDelete = event.target.parentElement;
        this.removeBook(bookRowToDelete.dataset.bookId);
      },
      toggleReadStateInTable(event) {
        if (!event.target.matches("td:nth-last-child(2)")) return;
        let bookRowToChangeState = event.target.parentElement;

        this.changeReadState(bookRowToChangeState.dataset.bookId);
      },
    };

    let obj = Object.assign(Object.create(proto), { bookTable, bookList: [] });

    let relatedAddForm = document.querySelector(
      `form[data-related-table-id=${obj.bookTable.id}]`
    );
    relatedAddForm.addEventListener("submit", obj.addBookToTable.bind(obj));

    obj.bookTable.addEventListener("click", obj.removeBookFromTable.bind(obj));
    obj.bookTable.addEventListener(
      "click",
      obj.toggleReadStateInTable.bind(obj)
    );
    return obj;
  })(document.querySelector("#simple-library")); */

  class Book {
    constructor(title, author, pageCount, isFinishedReading) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
      this._isFinishedReading = isFinishedReading;
      Object.defineProperty(this, "_isFinishedReading", { enumerable: false });
    }

    info() {
      return `${this.title} by ${this.author}, ${this.pageCount}, ${
        this.isFinishedReading ? "has read" : "not read yet"
      }`;
    }
    get isFinishedReading() {
      return this._isFinishedReading ? "has read" : "not read yet";
    }
  }
  Object.defineProperty(Book.prototype, "isFinishedReading", {
    enumerable: true,
  });
  let book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

  library.addBook(book);

  /* function createBook(title, author, pageCount, isFinishedReading) {
    let proto = {
      info() {
        return `${this.title} by ${this.author}, ${this.pageCount}, ${
          this.isFinishedReading ? "has read" : "not read yet"
        }`;
      },
      get isFinishedReading() {
        return this._isFinishedReading ? "has read" : "not read yet";
      },
    };

    let book = Object.assign(Object.create(proto), {
      title,
      author,
      pageCount,
      _isFinishedReading: isFinishedReading,
    });
    Object.defineProperty(book, "_isFinishedReading", { enumerable: false });
    return book;
  } */
})();
