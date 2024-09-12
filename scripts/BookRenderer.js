/**
 * A module for rendering books and managing their display.
 *
 * @module BookRenderer
 * @exports {Class} BookRenderer
 */
import {Book} from "./BookManager.js";

/**
 * A class for rendering books and managing their display.
 *
 * @class
 * @param {Object} manager - The manager object for managing books.
 * @param {HTMLElement} bookList - The HTML element representing the book list.
 * @param {HTMLElement} bookDialog - The HTML element representing the book
 * dialog.
 * @param {HTMLFormElement} formElement - The HTML form element for creating
 * or updating books.
 * @param {HTMLElement} countElement - The HTML element displaying the count
 * of books.
 */
export default class BookRenderer {
  /**
   * Constructs a new BookRenderer object.
   *
   * @param {Object} manager - The manager object for managing books.
   * @param {HTMLElement} bookList - The HTML element representing
   * the book list.
   * @param {HTMLElement} bookDialog - The HTML element representing
   * the book dialog.
   * @param {HTMLFormElement} formElement - The HTML form element for creating
   * or updating books.
   * @param {HTMLElement} countElement - The HTML element displaying
   * the count of books.
   */
  constructor(manager, bookList, bookDialog, formElement, countElement) {
    this.manager = manager;
    this.listElement = bookList;
    this.dialogElement = bookDialog;
    this.formElement = formElement;
    this.countElement = countElement;
  }

  /**
   * Renders a list of books on the page. If no books are provided, it uses
   * the books from the manager. Each book is displayed as a card with its
   * title, author, year, summary, cover, genre, and modified date.
   * The card also has buttons to edit and delete the book.
   * At the end of the list, there is an "Add Book" card that, when clicked,
   * shows the book dialog. The count of books is also displayed.
   *
   * @param {Array<Book>} [books=null] - An optional array of books to display.
   * If not provided, uses the books from the manager.
   * @return {void} This function does not return anything.
   */
  displayBooks(books = null) {
    if (!books) {
      books = this.manager.books;
    }

    this.listElement.innerHTML = '';

    books.forEach(book => {
      const {title, author, year, summary, cover, genre, modifiedDate} = book;
      const bookCard = document.createElement('li');
      const formattedTitle = book.title.replaceAll(". ", ".<br>");
      const bookStyle = cover ?
        `style="background-image: url('${cover}');"` : "";
      const bookContent = `
          <h2 class="book__content-title">${formattedTitle}</h2>
          <span>${author} (${year})</span>
          ${summary ? '<p>' + summary + '</p>' : ''}
          <p class="book__content-text">#${genre}</p>
      `;

      bookCard.innerHTML = `
          <div class="book shadow ${book.isRead() ? 'book--read' : ''}">
            <div class="book__side book__side--front" ${bookStyle}>
              <div class="book__content">${!cover ? bookContent : ''}</div>
            </div>
            <div class="book__side book__side--back">
              <div class="book__content">
                ${bookContent}
                <div class="book__content-buttons gap--block">
                  <button class="book-button book-button--edit">Изменить</button>
                  <button class="book-button book-button--delete">Удалить</button>
                </div>
                <span>Обновлено: ${modifiedDate}</span>
            </div>
          </div>
      `;
      bookCard.querySelector('.book-button--edit').addEventListener(
        'click', () => this.editBook(book)
      );
      bookCard.querySelector('.book-button--delete').addEventListener(
        'click', () => this.deleteBook(title)
      );
      this.listElement.appendChild(bookCard);
    });

    const bookAddCard = document.createElement('li');
    bookAddCard.innerHTML = `<div class="book__add"></div>`;
    bookAddCard.addEventListener(
      'click', () => this.dialogElement.show()
    );
    this.listElement.appendChild(bookAddCard);
    this.countElement.textContent = books.length;
  }

  /**
   * Create or update a book based on the form input values.
   *
   * @param {Event} event - The event object triggered by the form submission.
   * @return {void} This function does not return anything.
   */
  createOrUpdate(event) {
    event.preventDefault();
    const newBook = Book.create({
      title: this.formElement.title.value,
      author: this.formElement.author.value,
      year: this.formElement.year.value,
      summary: this.formElement.summary.value,
      genre: this.formElement.genre.value,
      cover: this.formElement.cover.value,
      status: this.formElement.status.value
    });

    if (newBook) {
      this.manager.createOrUpdate(this.editTmpTitle, newBook);
      this.dialogElement.close();
      this.editTmpTitle = null;
      this.displayBooks(this.manager.books);
    }
  }

  /**
   * Deletes a book with the given title if the user confirms the deletion.
   *
   * @param {string} title - The title of the book to delete.
   * @return {void} This function does not return anything.
   */
  deleteBook(title) {
    if (confirm("Вы действительно хотите удалить книгу?")) {
      this.manager.deleteBook(title);
      this.displayBooks(this.manager.books);
    }
  }

  /**
   * Edit a book by updating the form input values with the book's properties.
   *
   * @param {Object} book - The book object containing the properties to be edited.
   * @param {string} book.title - The title of the book.
   * @param {string} book.author - The author of the book.
   * @param {number} book.year - The year of publication of the book.
   * @param {string} book.summary - A summary of the book.
   * @param {string} book.cover - The cover image of the book.
   * @param {string} book.genre - The genre of the book.
   * @param {string} book.status - The reading status of the book.
   * @return {void} This function does not return anything.
   */
  editBook(book) {
    const {title, author, year, summary, cover, genre, status} = book;
    this.editTmpTitle = title;
    this.formElement.title.value = title;
    this.formElement.summary.value = summary;
    this.formElement.author.value = author;
    this.formElement.year.value = year;
    this.formElement.genre.value = genre;
    this.formElement.cover.value = cover;
    this.formElement.status.value = status;
    this.dialogElement.show();
  }

  /**
   * Deletes all books after confirming the user's intention.
   *
   * @return {void} This function does not return anything.
   */
  deleteAllBooks() {
    if (confirm("Внимание, данная операция удалит все книги независимо " +
      "от установленных фильтров! Продолжить?")) {
      this.manager.deleteAllBooks();
      this.displayBooks(this.manager.books);
    }
  }

  /**
   * Filters the books based on the provided criteria.
   *
   * @param {Object} criteria - The criteria to filter the books.
   * @return {void} This function does not return anything.
   */
  filterBooks(criteria) {
    const filteredBooks = this.manager.filterBooks(criteria);
    this.displayBooks(filteredBooks);
  }

  /**
   * Sorts the books array based on the specified field
   * and displays the sorted books.
   *
   * @param {string} field - The field to sort the books by.
   * @param {boolean} [ascending=true] - Whether to sort in ascending order. Defaults to true.
   * @return {void} This function does not return anything.
   */
  sortBooks(field, ascending = true) {
    const sortedBooks = this.manager.sortBooks(field, ascending);
    this.displayBooks(sortedBooks);
  }
}
