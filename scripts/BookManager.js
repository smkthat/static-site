/**
 * An enumeration of book statuses.
 * @readonly
 * @enum {string}
 */
const BookStatus = {
  READ: "прочитана",
  UNREAD: "не прочитана",
};

/**
 * Represents a book.
 */
class Book {
  /**
   * Creates a new Book instance.
   * @param {string} title - The title of the book.
   * @param {string} summary - The summary of the book.
   * @param {string} author - The author of the book.
   * @param {number} year - The year the book was published.
   * @param {string} cover - The cover image URL of the book.
   * @param {string} genre - The genre of the book.
   * @param {string} status - The status of the book (READ or UNREAD).
   * @param {string} modifiedDate - The date the book was last modified.
   */
  constructor(title, summary, author, year, cover, genre, status, modifiedDate) {
    this.title = title;
    this.summary = summary;
    this.author = author;
    this.year = year;
    this.cover = cover;
    this.genre = genre;
    this.status = status;
    this.modifiedDate = modifiedDate;
  }

  /**
   * Validates the book details.
   * @param {Object} details - The book details to validate.
   * @param {string} details.title - The title of the book.
   * @param {string} details.author - The author of the book.
   * @param {number} details.year - The year the book was published.
   * @param {string} details.genre - The genre of the book.
   * @throws {Error} If any of the required fields are missing.
   * @returns {boolean} True if the details are valid, false otherwise.
   */
  static validate(details) {
    const { title, author, year, genre } = details;
    if (!title || !author || !year || !genre) {
      throw new Error(
        'All fields (title, author, year, genre) are required.'
      );
    }
    return true;
  }

  /**
   * Creates a new Book instance from the given data.
   * @param {Object} data - The data to create the book from.
   * @param {string} data.title - The title of the book.
   * @param {string} data.summary - The summary of the book.
   * @param {string} data.author - The author of the book.
   * @param {number} data.year - The year the book was published.
   * @param {string} data.cover - The cover image URL of the book.
   * @param {string} data.genre - The genre of the book.
   * @param {string} data.status - The status of the book (READ or UNREAD).
   * @param {string} data.modifiedDate - The date the book was last modified.
   * @throws {Error} If the data is invalid.
   * @returns {Book} The created book instance.
   */
  static create(details) {
    if (this.validate(details)) {
      return new Book(
        details.title,
        details.summary,
        details.author,
        details.year,
        details.cover,
        details.genre,
        details.status ? details.status : BookStatus.UNREAD,
        new Date().toLocaleDateString(
          "ru-RU",
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "2-digit",
            minute: "2-digit"
          }
        )
      );
    }
  }

  /**
   * Parses the given data and creates a new Book instance if the data is valid.
   *
   * @param {Object} data - The data to parse and create a Book instance from.
   * @param {string} data.title - The title of the book.
   * @param {string} data.summary - The summary of the book.
   * @param {string} data.author - The author of the book.
   * @param {number} data.year - The year the book was published.
   * @param {string} data.cover - The cover image URL of the book.
   * @param {string} data.genre - The genre of the book.
   * @param {string} data.status - The status of the book (READ or UNREAD).
   * @param {string} data.modifiedDate - The date the book was last modified.
   * @return {Book|undefined} The created Book instance if the data is valid,
   * otherwise undefined.
   */
  static parseFromData(data) {
    if (this.validate(data)) {
      return new Book(
        data.title,
        data.summary,
        data.author,
        data.year,
        data.cover,
        data.genre,
        data.status,
        data.modifiedDate
      )
    }
  }

  /**
   * Updates the properties of the object with the provided details and sets the modifiedDate property to the current date.
   *
   * @param {Object} details - An object containing the properties to update.
   * @return {Object} The updated object.
   */
  update(details) {
    Object.assign(this, details);
    this.modifiedDate = new Date();
    return this
  }

  /**
   * Checks if the book status is READ.
   *
   * @return {boolean} True if the book status is READ, false otherwise.
   */
  isRead() {
    return this.status === BookStatus.READ
  }
}

class BookManager {
  /**
   * Constructs a new instance of the BookManager class.
   *
   * @param {DataStorageService} storageService - The storage service class
   * implemented from DataStorageService interface used to load
   * and save book data.
   */
  constructor(storageService) {
    this.storageService = storageService;
    this.books = this._getBooksFromStorage();
  }

  /**
   * Updates or creates a book in the book manager.
   *
   * @param {string} title - The title of the book.
   * @param {Book} book - The book object to update or create.
   * @return {void} This function does not return anything.
   */
  createOrUpdate(title, book) {
    const foundedBook = this.books.find(item => item.title === title)
    if (foundedBook) {
      foundedBook.update(book);
    } else {
      this.books.push(book);
    }
    this._saveToStorage();
  }

  /**
   * Deletes a book from the book manager based on the given title.
   *
   * @param {string} title - The title of the book to be deleted.
   * @return {void} This function does not return anything.
   */
  deleteBook(title) {
    this.books = this.books.filter(book => book.title !== title);
    this._saveToStorage();
  }

  /**
   * Deletes all books from the book manager.
   *
   * @return {void} This function does not return anything.
   */
  deleteAllBooks() {
    this.books = [];
    this._saveToStorage();
  }

  /**
   * Filters the books based on the provided criteria.
   *
   * @param {Object} criteria - The criteria to filter the books.
   * @return {Array} The filtered array of books.
   */
  filterBooks(criteria) {
    return this.books.filter(book => {
      return Object.keys(criteria).every(key => book[key] === criteria[key]);
    });
  }

  /**
   * Sorts the books array based on the specified field.
   *
   * @param {string} field - The field to sort the books by.
   * @param {boolean} [ascending=true] - Whether to sort in ascending order. Defaults to true.
   * @return {Array} The sorted array of books.
   */
  sortBooks(field, ascending = true) {
    return this.books.sort((a, b) => {
      if (a[field] < b[field]) return ascending ? -1 : 1;
      if (a[field] > b[field]) return ascending ? 1 : -1;
      return 0;
    });
  }

  /**
   * Retrieves books from storage and parses them into Book objects.
   *
   * @return {Array<Book>} An array of Book objects retrieved from storage.
   */
  _getBooksFromStorage() {
    const books = this.storageService.load("books") || [];
    return books.map(item => Book.parseFromData(item))
  }

  /**
   * Saves the current list of books to the storage service.
   *
   * @return {void} This function does not return anything.
   */
  _saveToStorage() {
    this.storageService.save('books', this.books);
  }
}

export { Book, BookManager };

