export default class Book {
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
