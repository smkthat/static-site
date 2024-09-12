/**
 * A class that manages the theme of the application.
 *
 * @class ThemeManager
 * @param {DataStorageInterface} storageService - The storage service implemented
 * from the DataStorageInterface and used to save and load theme data.
 * @property {string} theme - The current theme preference ('light' or 'dark').
 * @property {DataStorageInterface} storageService - The storage service used
 * to save and load theme data.
 * @method toggleTheme - Toggles the theme between light and dark.
 * @method applyTheme - Applies the current theme to the document body.
 * @method getSystemTheme - Gets the system theme preference.
 */
export default class ThemeManager {
  /**
   * Creates a new instance of the ThemeManager class.
   *
   * @constructor
   * @param {DataStorageInterface} storageService - The storage service used
   * to save and load theme data.
   */
  constructor(storageService) {
    this.storageService = storageService;
    this.theme = this.storageService.load('theme') || this.getSystemTheme();
    this.applyTheme();
  }

  /**
   * Toggles the theme between light and dark.
   *
   * @method toggleTheme
   * @return {void}
   */
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.storageService.save('theme', this.theme);
    this.applyTheme();
  }

  /**
   * Applies the current theme to the document body.
   *
   * @method applyTheme
   * @return {void}
   */
  applyTheme() {
    document.documentElement.setAttribute(
      'data-theme',
      this.theme
    );
  }

  /**
   * Gets the system theme preference.
   *
   * @method getSystemTheme
   * @return {string} - The system theme preference ('light' or 'dark').
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches) {
      return 'dark';
    }
    return 'light';
  }
}
