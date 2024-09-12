import DataStorageInterface from 'scripts/DataStorageInterface.js';

/**
 * A class that extends the DataStorageInterface and provides methods
 * for saving, loading, and deleting data in local storage.
 *
 * @extends DataStorageInterface
 */
export default class LocalStorageService extends DataStorageInterface {
  /**
   * Saves the given data to local storage using the specified key.
   *
   * @param {string} key - The key used to store the data in local storage.
   * @param {any} data - The data to be saved.
   * @return {void} This function does not return anything.
   */
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Loads data from localStorage based on the provided key.
   *
   * @param {string} key - The key used to retrieve the data from localStorage.
   * @return {any} The parsed JSON data if it exists, otherwise the raw data.
   */
  load(key) {
    const data = localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch {
      return data; // Return the raw data if it's not JSON
    }
  }

  /**
   * Deletes the value associated with the specified key from localStorage.
   *
   * @param {string} key - The key of the value to be deleted.
   * @return {void} This function does not return anything.
   */
  delete(key) {
    localStorage.removeItem(key);
  }
}
