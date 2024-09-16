/**
 * Initializes the book management system on a page load.
 * Sets up event listeners for creating, updating, filtering,
 * and deleting books. Manages themes and displays books based
 * on user interactions.
 */

import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate'
import LocalStorageService from './LocalStorageService.js';
import {BookManager} from './BookManager.js';
import ThemeManager from './ThemeManager.js';
import BookRenderer from "./BookRenderer.js";

document.addEventListener('DOMContentLoaded', () => {
  const storageService = new LocalStorageService();
  const bookManager = new BookManager(storageService);

  const bookDialog = document.getElementById('book-dialog');
  bookDialog.querySelector('.book-dialog__close').addEventListener(
    'click', () => bookDialog.close()
  );
  const bookForm = document.getElementById('book-form');
  const bookList = document.getElementById('books');
  const bookCount = document.getElementById('book-count');

  autoAnimate(bookList);

  const bookRenderer = new BookRenderer(
    bookManager, bookList, bookDialog, bookForm, bookCount
  );

  bookForm.addEventListener(
    'submit', (event) => bookRenderer.createOrUpdate(event)
  );

  const bookFilterStatus = document.getElementById("filterStatus");
  const bookFilterGenre = document.getElementById("filterGenre");

  // Filters the book list based on the selected status and genre.
  function _filterBookList() {
    const criteria = {};
    if (bookFilterStatus.value !== "") {
      criteria['status'] = bookFilterStatus.value;
    }
    if (bookFilterGenre.value !== "") {
      criteria["genre"] = bookFilterGenre.value;
    }

    if (criteria) {
      bookRenderer.filterBooks(criteria)
    }
  }

  bookFilterGenre.addEventListener('change', () => _filterBookList());
  bookFilterStatus.addEventListener('change', () => _filterBookList());

  const deleteAllBooksButton = document.getElementById('clear-books');
  deleteAllBooksButton.addEventListener(
    'click', () => bookRenderer.deleteAllBooks()
  );

  const themeToggleButton = document.getElementById('theme-toggle');
  const themeManager = new ThemeManager(storageService);
  themeToggleButton.addEventListener(
    'click', () => themeManager.toggleTheme()
  );

  bookRenderer.displayBooks()
});
